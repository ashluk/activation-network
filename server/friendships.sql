DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS chat;


CREATE TABLE friendships( 
    id SERIAL PRIMARY KEY, 
    sender_id INT REFERENCES users(id) NOT NULL, 
    recipient_id INT REFERENCES users(id) NOT NULL, 
    accepted BOOLEAN DEFAULT false );

CREATE TABLE chat (
      id SERIAL PRIMARY KEY,
      senderId INT NOT NULL REFERENCES users(id) ,
      message VARCHAR,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      
)