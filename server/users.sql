DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reset_codes;


CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
 first VARCHAR(255) NOT NULL CHECK (first <> ''),
    last VARCHAR(255) NOT NULL CHECK (last <> ''),
    email VARCHAR(255) NOT NULL UNIQUE CHECK(email <> ''),
    password VARCHAR NOT NULL CHECK (password <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE REFERENCES users(email),
    secret VARCHAR NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)