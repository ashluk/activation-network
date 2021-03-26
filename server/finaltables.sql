DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS reset_codes;
DROP TABLE IF EXISTS private_message;
DROP TABLE IF EXISTS friendships;

DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
 first VARCHAR(255) NOT NULL CHECK (first <> ''),
    last VARCHAR(255) NOT NULL CHECK (last <> ''),
    email VARCHAR(255) NOT NULL UNIQUE CHECK(email <> ''),
    password VARCHAR NOT NULL CHECK (password <> ''),
    imageUrl VARCHAR,
    bio VARCHAR, 
    artistormusician BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE items (
          id SERIAL PRIMARY KEY,
          itemId INT NOT NULL REFERENCES users(id),
          title VARCHAR(255) NOT NULL CHECK (title <> ''),
          content VARCHAR NOT NULL CHECK (title <> '')

);

CREATE TABLE tags (
          id SERIAL PRIMARY KEY,
          itemId INT NOT NULL REFERENCES users(id),
          title VARCHAR(255) NOT NULL CHECK (title <> '')

);
CREATE TABLE private_message (
      id SERIAL PRIMARY KEY,
      senderId INT NOT NULL REFERENCES users(id),
      message VARCHAR,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
     CREATE TABLE reset_codes (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL REFERENCES users(email),
    secret VARCHAR NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships( 
    id SERIAL PRIMARY KEY, 
    sender_id INT REFERENCES users(id) NOT NULL, 
    recipient_id INT REFERENCES users(id) NOT NULL, 
    accepted BOOLEAN DEFAULT false );