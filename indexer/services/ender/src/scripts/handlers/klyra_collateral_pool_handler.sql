CREATE OR REPLACE FUNCTION klyra_collateral_pool_handler(event_data jsonb) RETURNS jsonb AS $$
/**
  Parameters:
    - event_data: The 'data' field of the IndexerTendermintEvent
        converted to JSON format. Conversion to JSON is expected to be done by JSON.stringify.
  Returns: JSON object containing fields:
    - collateral_pool: The upserted collateral pool in collateral-pools-model format.

  (Note that no text should exist before the function declaration to ensure that exception line numbers are correct.)
*/
DECLARE
    collateral_pool_record collateral_pools%ROWTYPE;
    QUOTE_CURRENCY_ATOMIC_RESOLUTION constant numeric = -6;
BEGIN
    collateral_pool_record."id" = (event_data->'id')::integer;
    collateral_pool_record."maxCumulativeInsuranceFundDeltaPerBlock" = (event_data->'maxCumulativeInsuranceFundDeltaPerBlock')::integer;
    collateral_pool_record."multiCollateralAssets" = (event_data->'multiCollateralAssets');
    collateral_pool_record."quoteAssetId" = (event_data->'quoteAssetId')::integer;

    INSERT INTO collateral_pools
    VALUES (collateral_pool_record.*)
    ON CONFLICT ("id") DO
        UPDATE
        SET
            "maxCumulativeInsuranceFundDeltaPerBlock" = collateral_pool_record."maxCumulativeInsuranceFundDeltaPerBlock",
            "multiCollateralAssets" = collateral_pool_record."multiCollateralAssets",
            "quoteAssetId" = collateral_pool_record."quoteAssetId"
    RETURNING * INTO collateral_pool_record;

    RETURN jsonb_build_object(
        'collateral_pool',
        klyra_to_jsonb(collateral_pool_record)
    );
END;
$$ LANGUAGE plpgsql;