CREATE OR REPLACE FUNCTION dydx_market_price_update_handler(block_height int, block_time timestamp, event_data jsonb) RETURNS jsonb AS $$
/**
  Parameters:
    - block_height: the height of the block being processing.
    - block_time: the time of the block being processed.
    - event_data: The 'data' field of the IndexerTendermintEvent (https://github.com/dydxprotocol/v4-chain/blob/9ed26bd/proto/dydxprotocol/indexer/indexer_manager/event.proto#L25)
        converted to JSON format. Conversion to JSON is expected to be done by JSON.stringify.
  Returns: JSON object containing fields:
    - market: The updated market in market-model format (https://github.com/dydxprotocol/v4-chain/blob/9ed26bd/indexer/packages/postgres/src/models/market-model.ts).
    - oracle_price: The created oracle price in oracle-price-model format (https://github.com/dydxprotocol/v4-chain/blob/9ed26bd/indexer/packages/postgres/src/models/oracle-price-model.ts).

  (Note that no text should exist before the function declaration to ensure that exception line numbers are correct.)
*/
DECLARE
    market_record_id integer;
    market_record markets%ROWTYPE;
    spot_price numeric;
    pnl_price numeric;
    oracle_price_record oracle_prices%ROWTYPE;
BEGIN
    market_record_id = (event_data->'marketId')::integer;
    SELECT * INTO market_record FROM markets WHERE "id" = market_record_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'MarketPriceUpdateEvent contains a non-existent market id. Id: %', market_record_id;
    END IF;

    spot_price = dydx_trim_scale(
        dydx_from_jsonlib_long(event_data->'priceUpdate'->'spotPriceWithExponent') *
        power(10, market_record.exponent::numeric));
    pnl_price = dydx_trim_scale(
        dydx_from_jsonlib_long(event_data->'priceUpdate'->'pnlPriceWithExponent') *
        power(10, market_record.exponent::numeric));

    market_record."spotPrice" = spot_price;
    market_record."pnlPrice" = pnl_price;

    UPDATE markets
    SET
        "spotPrice" = market_record."spotPrice",
        "pnlPrice" = market_record."pnlPrice"
    WHERE id = market_record."id";

    oracle_price_record."id" = dydx_uuid_from_oracle_price_parts(market_record_id, block_height);
    oracle_price_record."effectiveAt" = block_time;
    oracle_price_record."effectiveAtHeight" = block_height;
    oracle_price_record."marketId" = market_record_id;
    oracle_price_record."spotPrice" = spot_price;
    oracle_price_record."pnlPrice" = pnl_price;

    INSERT INTO oracle_prices VALUES (oracle_price_record.*)
    ON CONFLICT (id) DO UPDATE
    SET
        "effectiveAt" = EXCLUDED."effectiveAt",
        "effectiveAtHeight" = EXCLUDED."effectiveAtHeight",
        "marketId" = EXCLUDED."marketId",
        "spotPrice" = EXCLUDED."spotPrice",
        "pnlPrice" = EXCLUDED."pnlPrice";

    RETURN jsonb_build_object(
        'market',
        dydx_to_jsonb(market_record),
        'oracle_price',
        dydx_to_jsonb(oracle_price_record)
    );
END;
$$ LANGUAGE plpgsql;