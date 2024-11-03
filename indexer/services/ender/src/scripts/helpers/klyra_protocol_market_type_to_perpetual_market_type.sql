CREATE OR REPLACE FUNCTION klyra_protocol_market_type_to_perpetual_market_type(marketType jsonb)
    RETURNS text AS $$

BEGIN
    CASE marketType
        WHEN '0'::jsonb THEN RETURN 'CROSS'; /** MARKET_TYPE_CROSS */
        WHEN '1'::jsonb THEN RETURN 'ISOLATED'; /** MARKET_TYPE_ISOLATED */
        ELSE RAISE EXCEPTION 'Invalid market type: %', marketType;
    END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE PARALLEL SAFE;