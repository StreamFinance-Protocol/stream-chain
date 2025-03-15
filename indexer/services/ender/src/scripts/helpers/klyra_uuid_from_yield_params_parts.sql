CREATE OR REPLACE FUNCTION klyra_uuid_from_yields_params_parts(block_height int) RETURNS uuid AS $$
/**
  Returns a UUID using the parts of the yields params.

  (Note that no text should exist before the function declaration to ensure that exception line numbers are correct.)
*/
BEGIN
    return klyra_uuid(block_height::text);
END;
$$ LANGUAGE plpgsql IMMUTABLE PARALLEL SAFE;
