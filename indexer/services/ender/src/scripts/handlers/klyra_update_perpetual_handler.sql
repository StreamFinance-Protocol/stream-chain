CREATE OR REPLACE FUNCTION klyra_update_perpetual_handler(event_data jsonb) RETURNS jsonb AS $$
/**
  Parameters:
    - event_data: The 'data' field of the IndexerTendermintEvent
        converted to JSON format. Conversion to JSON is expected to be done by JSON.stringify.
  Returns: JSON object containing fields:
    - perpetual_market: The updated perpetual market in perpetual-market-model format.

  (Note that no text should exist before the function declaration to ensure that exception line numbers are correct.)
*/
DECLARE
    perpetual_market_id bigint;
    perpetual_market_record perpetual_markets%ROWTYPE;
BEGIN
    perpetual_market_id = (event_data->'id')::bigint;
    perpetual_market_record."ticker" = event_data->>'ticker';
    perpetual_market_record."marketId" = (event_data->'marketId')::integer;
    perpetual_market_record."atomicResolution" = (event_data->'atomicResolution')::integer;
    perpetual_market_record."liquidityTierId" = (event_data->'liquidityTier')::integer;
    perpetual_market_record."dangerIndexPpm" = (event_data->'dangerIndexPpm')::integer;
    perpetual_market_record."isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock" = (event_data->>'isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock')::bigint;

    UPDATE perpetual_markets
    SET
        "ticker" = perpetual_market_record."ticker",
        "marketId" = perpetual_market_record."marketId",
        "atomicResolution" = perpetual_market_record."atomicResolution",
        "liquidityTierId" = perpetual_market_record."liquidityTierId",
        "dangerIndexPpm" = perpetual_market_record."dangerIndexPpm",
        "isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock" = perpetual_market_record."isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock"
    WHERE "id" = perpetual_market_id
    RETURNING * INTO perpetual_market_record;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Could not find perpetual market with corresponding id %', perpetual_market_id;
    END IF;

    RETURN jsonb_build_object(
            'perpetual_market',
            klyra_to_jsonb(perpetual_market_record)
        );
END;
$$ LANGUAGE plpgsql;