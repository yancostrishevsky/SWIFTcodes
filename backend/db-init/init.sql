CREATE TABLE IF NOT EXISTS swift_codes (
    id SERIAL PRIMARY KEY,
    swift_code VARCHAR(11) NOT NULL UNIQUE,
    bic8 VARCHAR(8) NOT NULL,
    bank_name TEXT NOT NULL,
    address TEXT,
    town_name TEXT,
    country_iso2 CHAR(2) NOT NULL,
    country_name TEXT NOT NULL,
    is_headquarter BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW()
);

COPY swift_codes(
  swift_code, bic8, bank_name, address, town_name,
  country_iso2, country_name, is_headquarter
)
FROM '/docker-entrypoint-initdb.d/swift_parsed.csv'
WITH (FORMAT csv, HEADER true);

CREATE INDEX IF NOT EXISTS idx_swift_code ON swift_codes (swift_code);
CREATE INDEX IF NOT EXISTS idx_bic8 ON swift_codes (bic8);
CREATE INDEX IF NOT EXISTS idx_country_iso2 ON swift_codes (country_iso2);
CREATE INDEX IF NOT EXISTS idx_is_headquarter ON swift_codes (is_headquarter);
