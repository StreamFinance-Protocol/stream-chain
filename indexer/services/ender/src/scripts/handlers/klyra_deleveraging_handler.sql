CREATE OR REPLACE FUNCTION klyra_deleveraging_handler(
    block_height int, block_time timestamp, event_data jsonb, event_index int, transaction_index int,
    transaction_hash text) RETURNS jsonb AS $$
/**
  Parameters:
    - block_height: the height of the block being processing.
    - block_time: the time of the block being processed.
    - event_data: The 'data' field of the IndexerTendermintEvent 
        converted to JSON format. Conversion to JSON is expected to be done by JSON.stringify.
    - event_index: The 'event_index' of the IndexerTendermintEvent.
    - transaction_index: The transaction_index of the IndexerTendermintEvent after the conversion that takes into
        account the block_event
    - transaction_hash: The transaction hash corresponding to this event from the IndexerTendermintBlock 'tx_hashes'.
  Returns: JSON object containing fields:
    - liquidated_fill: The created liquidated fill in fill-model format 
    - offsetting_fill: The created offsetting fill in fill-model format 
    - perpetual_market: The perpetual market for the deleveraging in perpetual-market-model format 
    - liquidated_perpetual_position: The updated liquidated perpetual position in perpetual-position-model format
    - offsetting_perpetual_position: The updated offsetting perpetual position in perpetual-position-model format 

  (Note that no text should exist before the function declaration to ensure that exception line numbers are correct.)
*/
DECLARE
    QUOTE_CURRENCY_ATOMIC_RESOLUTION constant numeric = -6;
    FEE constant numeric = 0;
    perpetual_id bigint;
    clob_pair_id bigint;
    liquidated_subaccount_uuid uuid;
    offsetting_subaccount_uuid uuid;
    perpetual_market_record perpetual_markets%ROWTYPE;
    liquidated_fill_record fills%ROWTYPE;
    offsetting_fill_record fills%ROWTYPE;
    liquidated_perpetual_position_record perpetual_positions%ROWTYPE;
    offsetting_perpetual_position_record perpetual_positions%ROWTYPE;
    liquidated_side text;
    offsetting_side text;
    size numeric;
    quote_amount numeric;
    price numeric;
    event_id bytea;
BEGIN
    perpetual_id = (event_data->'perpetualId')::bigint;
    BEGIN
        SELECT * INTO STRICT perpetual_market_record FROM perpetual_markets WHERE "id" = perpetual_id;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE EXCEPTION 'Unable to find perpetual market with perpetualId %', perpetual_id;
        WHEN TOO_MANY_ROWS THEN
            /** This should never happen and if it ever were to would indicate that the table has malformed data. */
            RAISE EXCEPTION 'Found multiple perpetual markets with perpetualId %', perpetual_id;
    END;
    /**
      Calculate sizes, prices, and fill amounts.

      TODO(IND-238): Extract out calculation of quantums and subticks to their own SQL functions.
    */
    size = klyra_trim_scale(klyra_from_jsonlib_long(event_data->'fillAmount') *
                                 power(10, perpetual_market_record."atomicResolution")::numeric);
    quote_amount = klyra_trim_scale(klyra_from_jsonlib_long(event_data->'totalQuoteQuantums') *
                                  power(10, QUOTE_CURRENCY_ATOMIC_RESOLUTION)::numeric);
    price = klyra_trim_scale(quote_amount / size);

    liquidated_subaccount_uuid = klyra_uuid_from_subaccount_id(event_data->'liquidated');
    offsetting_subaccount_uuid = klyra_uuid_from_subaccount_id(event_data->'offsetting');
    offsetting_side = CASE WHEN (event_data->'isBuy')::bool THEN 'BUY' ELSE 'SELL' END;
    liquidated_side = CASE WHEN offsetting_side = 'BUY' THEN 'SELL' ELSE 'BUY' END;
    clob_pair_id = perpetual_market_record."clobPairId";

    /* Insert the associated fill records for this deleveraging event. */
    event_id = klyra_event_id_from_parts(
        block_height, transaction_index, event_index);
    INSERT INTO fills
        ("id", "subaccountId", "side", "liquidity", "type", "clobPairId", "size", "price", "quoteAmount",
         "eventId", "transactionHash", "createdAt", "createdAtHeight", "fee")
    VALUES (klyra_uuid_from_fill_event_parts(event_id, 'TAKER'),
            liquidated_subaccount_uuid,
            liquidated_side,
            'TAKER',
            'DELEVERAGED',
            clob_pair_id,
            size,
            price,
            quote_amount,
            event_id,
            transaction_hash,
            block_time,
            block_height,
            FEE)
    RETURNING * INTO liquidated_fill_record;

    INSERT INTO fills
        ("id", "subaccountId", "side", "liquidity", "type", "clobPairId", "size", "price", "quoteAmount",
         "eventId", "transactionHash", "createdAt", "createdAtHeight", "fee")
    VALUES (klyra_uuid_from_fill_event_parts(event_id, 'MAKER'),
                        offsetting_subaccount_uuid,
                        offsetting_side,
                        'MAKER',
                        'OFFSETTING',
                        clob_pair_id,
                        size,
                        price,
                        quote_amount,
                        event_id,
                        transaction_hash,
                        block_time,
                        block_height,
                        FEE)
    RETURNING * INTO offsetting_fill_record;

    /* Upsert the perpetual_position records for this deleveraging event. */
    liquidated_perpetual_position_record = klyra_update_perpetual_position_aggregate_fields(
        liquidated_subaccount_uuid,
        perpetual_id,
        liquidated_side,
        size,
        price);
    offsetting_perpetual_position_record = klyra_update_perpetual_position_aggregate_fields(
        offsetting_subaccount_uuid,
        perpetual_id,
        offsetting_side,
        size,
        price);


    RETURN jsonb_build_object(
            'liquidated_fill',
            klyra_to_jsonb(liquidated_fill_record),
            'offsetting_fill',
            klyra_to_jsonb(offsetting_fill_record),
            'perpetual_market',
            klyra_to_jsonb(perpetual_market_record),
            'liquidated_perpetual_position',
            klyra_to_jsonb(liquidated_perpetual_position_record),
            'offsetting_perpetual_position',
            klyra_to_jsonb(offsetting_perpetual_position_record)
        );
END;
$$ LANGUAGE plpgsql;
