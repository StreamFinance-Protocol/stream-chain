CREATE OR REPLACE FUNCTION klyra_yield_params_handler(
    block_height int, block_time timestamp, event_data jsonb) RETURNS jsonb AS $$
/**
  Parameters:
    - event_data: The 'data' field of the IndexerTendermintEvent
        converted to JSON format. Conversion to JSON is expected to be done by JSON.stringify.
  Returns: JSON object containing fields:
    - asset: The created asset in asset-model format.

  (Note that no text should exist before the function declaration to ensure that exception line numbers are correct.)
*/
DECLARE
    yield_params_record yield_params%ROWTYPE;
BEGIN
    yield_params_record."id" = klyra_uuid_from_yield_params_parts(block_height);
    yield_params_record."sDAIPrice" = jsonb_extract_path_text(event_data, 'sdaiPrice');
    yield_params_record."assetYieldIndex" = jsonb_extract_path_text(event_data, 'assetYieldIndex');
    yield_params_record."createdAtHeight" = block_height;
    yield_params_record."createdAt" = block_time;

    INSERT INTO yield_params VALUES (yield_params_record.*);

    RETURN jsonb_build_object(
        'yield_params',
        klyra_to_jsonb(yield_params_record)
    );
END;
$$ LANGUAGE plpgsql;