DROP TABLE IF EXISTS reset_codes;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
 first VARCHAR(255) NOT NULL CHECK (first <> ''),
    last VARCHAR(255) NOT NULL CHECK (last <> ''),
    email VARCHAR(255) NOT NULL UNIQUE CHECK(email <> ''),
    password VARCHAR NOT NULL CHECK (password <> ''),
    imageUrl VARCHAR,
    bio VARCHAR, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL REFERENCES users(email),
    secret VARCHAR NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)