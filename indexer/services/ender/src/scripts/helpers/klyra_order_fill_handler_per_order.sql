CREATE OR REPLACE FUNCTION klyra_order_fill_handler_per_order(
    field text, block_height int, block_time timestamp, event_data jsonb, event_index int, transaction_index int,
    transaction_hash text, fill_liquidity text, fill_type text, tdai_asset_id text, order_canceled_status text) RETURNS jsonb AS $$
/**
  Parameters:
    - field: the field storing the order to process.
    - block_height: the height of the block being processing.
    - block_time: the time of the block being processed.
    - event_data: The 'data' field of the IndexerTendermintEvent
        converted to JSON format. Conversion to JSON is expected to be done by JSON.stringify.
    - event_index: The 'event_index' of the IndexerTendermintEvent.
    - transaction_index: The transaction_index of the IndexerTendermintEvent after the conversion that takes into
        account the block_event
    - transaction_hash: The transaction hash corresponding to this event from the IndexerTendermintBlock 'tx_hashes'.
    - fill_liquidity: The liquidity for the fill record.
    - fill_type: The type for the fill record.
    - tdai_asset_id: The TDAI asset id.
    - order_canceled_status: Status of order cancelation
  Returns: JSON object containing fields:
    - order: The updated order in order-model format
    - fill: The updated fill in fill-model format
    - perpetual_market: The perpetual market for the order in perpetual-market-model format.
    - perpetual_position: The updated perpetual position in perpetual-position-model format.

  (Note that no text should exist before the function declaration to ensure that exception line numbers are correct.)
*/
DECLARE
    order_ jsonb;
    maker_order jsonb;
    clob_pair_id bigint;
    subaccount_uuid uuid;
    perpetual_market_record perpetual_markets%ROWTYPE;
    order_record orders%ROWTYPE;
    fill_record fills%ROWTYPE;
    perpetual_position_record perpetual_positions%ROWTYPE;
    asset_record assets%ROWTYPE;
    order_uuid uuid;
    order_side text;
    order_size numeric;
    order_price numeric;
    order_client_metadata bigint;
    router_fee_ppm bigint;
    router_fee_owner text;
    fee numeric;
    fill_amount numeric;
    total_filled numeric;
    maker_price numeric;
    event_id bytea;
BEGIN
    order_ = event_data->field;
    maker_order = event_data->'makerOrder';
    clob_pair_id = jsonb_extract_path(order_, 'orderId', 'clobPairId')::bigint;
    perpetual_market_record = klyra_get_perpetual_market_for_clob_pair(clob_pair_id);

    BEGIN
        SELECT * INTO STRICT asset_record FROM assets WHERE "id" = tdai_asset_id;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE EXCEPTION 'Unable to find asset with id %', tdai_asset_id;
    END;

    /**
      Calculate sizes, prices, and fill amounts.

      TODO(IND-238): Extract out calculation of quantums and subticks to their own SQL functions.
    */
    order_size = klyra_trim_scale(klyra_from_jsonlib_long(order_->'quantums') *
                                 power(10, perpetual_market_record."atomicResolution")::numeric);
    order_price = klyra_trim_scale(klyra_from_jsonlib_long(order_->'subticks') *
                                  power(10, perpetual_market_record."quantumConversionExponent" +
                                                     asset_record."atomicResolution" -
                                                     perpetual_market_record."atomicResolution")::numeric);
    fill_amount = klyra_trim_scale(klyra_from_jsonlib_long(event_data->'fillAmount') *
                                  power(10, perpetual_market_record."atomicResolution")::numeric);
    maker_price = klyra_trim_scale(klyra_from_jsonlib_long(maker_order->'subticks') *
                                  power(10, perpetual_market_record."quantumConversionExponent" +
                                                     asset_record."atomicResolution" -
                                                     perpetual_market_record."atomicResolution")::numeric);
    total_filled = klyra_trim_scale(klyra_get_total_filled(fill_liquidity, event_data) *
                                   power(10, perpetual_market_record."atomicResolution")::numeric);
    fee = klyra_trim_scale(klyra_get_fee(fill_liquidity, event_data) *
                          power(10, asset_record."atomicResolution")::numeric);

    order_uuid = klyra_uuid_from_order_id(order_->'orderId');
    subaccount_uuid = klyra_uuid_from_subaccount_id(jsonb_extract_path(order_, 'orderId', 'subaccountId'));
    order_side = klyra_from_protocol_order_side(order_->'side');
    order_client_metadata = (order_->'clientMetadata')::bigint;
    router_fee_ppm = (order_->'routerFeePpm')::bigint;
    router_fee_owner = (order_->'routerFeeOwner')::text;

    /** Upsert the order, populating the order_record fields with what will be in the database. */
    SELECT * INTO order_record FROM orders WHERE "id" = order_uuid;
    order_record."side" = order_side;
    order_record."size" = order_size;
    order_record."price" = order_price;
    order_record."timeInForce" = klyra_from_protocol_time_in_force(order_->'timeInForce');
    order_record."reduceOnly" = (order_->>'reduceOnly')::boolean;
    order_record."orderFlags" = jsonb_extract_path(order_, 'orderId', 'orderFlags')::bigint;
    order_record."goodTilBlock" = (order_->'goodTilBlock')::bigint;
    order_record."goodTilBlockTime" = to_timestamp((order_->'goodTilBlockTime')::double precision);
    order_record."clientMetadata" = order_client_metadata;
    order_record."routerFeePpm" = router_fee_ppm;
    order_record."routerFeeOwner" = router_fee_owner;
    order_record."updatedAt" = block_time;
    order_record."updatedAtHeight" = block_height;

    IF FOUND THEN
        order_record."totalFilled" = total_filled;
        order_record."status" = klyra_get_order_status(total_filled, order_record.size, order_canceled_status, order_record."orderFlags", order_record."timeInForce");

        UPDATE orders
        SET
            "side" = order_record."side",
            "size" = order_record."size",
            "totalFilled" = order_record."totalFilled",
            "price" = order_record."price",
            "status" = order_record."status",
            "orderFlags" = order_record."orderFlags",
            "goodTilBlock" = order_record."goodTilBlock",
            "goodTilBlockTime" = order_record."goodTilBlockTime",
            "timeInForce" = order_record."timeInForce",
            "reduceOnly" = order_record."reduceOnly",
            "clientMetadata" = order_record."clientMetadata",
            "routerFeePpm" = order_record."routerFeePpm",
            "routerFeeOwner" = order_record."routerFeeOwner",
            "updatedAt" = order_record."updatedAt",
            "updatedAtHeight" = order_record."updatedAtHeight"
        WHERE id = order_uuid;
    ELSE
        order_record."id" = order_uuid;
        order_record."subaccountId" = subaccount_uuid;
        order_record."clientId" = jsonb_extract_path_text(order_, 'orderId', 'clientId')::bigint;
        order_record."clobPairId" = clob_pair_id;
        order_record."side" = order_side;
        order_record."type" = 'LIMIT'; /* TODO: Add additional order types once we support */

        order_record."totalFilled" = fill_amount;
        order_record."status" = klyra_get_order_status(fill_amount, order_size, order_canceled_status, order_record."orderFlags", order_record."timeInForce");
        order_record."createdAtHeight" = block_height;
        INSERT INTO orders
            ("id", "subaccountId", "clientId", "clobPairId", "side", "size", "totalFilled", "price", "type",
            "status", "timeInForce", "reduceOnly", "orderFlags", "goodTilBlock", "goodTilBlockTime", "createdAtHeight",
            "clientMetadata", "routerFeePpm", "routerFeeOwner", "triggerPrice", "updatedAt", "updatedAtHeight")
        VALUES (order_record.*);
    END IF;

    /* Insert the associated fill record for this order_fill event. */
    event_id = klyra_event_id_from_parts(
        block_height, transaction_index, event_index);
    INSERT INTO fills
        ("id", "subaccountId", "side", "liquidity", "type", "clobPairId", "orderId", "size", "price", "quoteAmount",
         "eventId", "transactionHash", "createdAt", "createdAtHeight", "clientMetadata", "fee")
    VALUES (klyra_uuid_from_fill_event_parts(event_id, fill_liquidity),
            subaccount_uuid,
            order_side,
            fill_liquidity,
            fill_type,
            clob_pair_id,
            order_uuid,
            fill_amount,
            maker_price,
            klyra_trim_scale(fill_amount * maker_price),
            event_id,
            transaction_hash,
            block_time,
            block_height,
            order_client_metadata,
            fee)
    RETURNING * INTO fill_record;

    /* Upsert the perpetual_position record for this order_fill event. */
    perpetual_position_record = klyra_update_perpetual_position_aggregate_fields(
            subaccount_uuid,
            perpetual_market_record."id",
            order_side,
            fill_amount,
            maker_price);

    RETURN jsonb_build_object(
            'order',
            klyra_to_jsonb(order_record),
            'fill',
            klyra_to_jsonb(fill_record),
            'perpetual_market',
            klyra_to_jsonb(perpetual_market_record),
            'perpetual_position',
            klyra_to_jsonb(perpetual_position_record)
        );
END;
$$ LANGUAGE plpgsql;
