CREATE OR REPLACE FUNCTION klyra_yields_params_handler(
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
    yields_params_record yields_params%ROWTYPE;
BEGIN
    yields_params_record."id" = klyra_uuid_from_yields_params_parts(block_height);
    yields_params_record."sDAIPrice" = jsonb_extract_path_text(event_data, 'sdaiPrice');
    yields_params_record."assetYieldsIndex" = jsonb_extract_path_text(event_data, 'assetYieldsIndex');
    yields_params_record."createdAtHeight" = block_height;
    yields_params_record."createdAt" = block_time;

    INSERT INTO yields_params VALUES (yields_params_record.*);

    RETURN jsonb_build_object(
        'yields_params',
        klyra_to_jsonb(yields_params_record)
    );
END;
$$ LANGUAGE plpgsql;