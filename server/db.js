const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);
//////////////////REGISTER//////////////////////////
module.exports.addUser = (first, last, email, password) => {
    const q = `INSERT INTO users (first, last, email, password)
            values($1, $2, $3, $4)
            RETURNING id
            
    `;
    const params = [first, last, email, password];

    return db.query(q, params);
};
//////////////////PASSWORD/////////////////////////
module.exports.passwordCompare = (email) => {
    console.log("email db", email);
    const q = `SELECT password, id FROM users WHERE email = $1 `;
    const params = [email];
    return db.query(q, params);
};
//////////////////SECRET CODE////////////////////
module.exports.codeCompare = (email) => {
    const q = `SELECT email, id FROM users WHERE email = $1 `;
    const params = [email];
    return db.query(q, params);
};

module.exports.secretCode = (secret, email) => {
    const q = `INSERT INTO reset_codes (secret, email)
    values($1, $2)
    RETURNING id`;
    const params = [secret, email];
    return db.query(q, params);
};
module.exports.getSecretCode = (email) => {
    const q = `SELECT secret FROM reset_codes WHERE email = $1
    ORDER BY id DESC LIMIT 1 `;
    const params = [email];
    return db.query(q, params);
};
// const q = `SELECT secret FROM reset_codes WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' `;
module.exports.newPassword = (password, email) => {
    const q = `UPDATE users
    SET password = $1
    WHERE email = $2 `;
    const params = [password, email];
    return db.query(q, params);
};
////////////////UPLOADER/////////////////
module.exports.addImages = (imageUrl, userId) => {
    const q = `UPDATE users
    SET imageUrl = $1
    WHERE id = $2
    RETURNING imageurl `;
    const params = [imageUrl, userId];
    return db.query(q, params);
};

//////////////BIO////////////////////
module.exports.addBio = (bio, userId) => {
    const q = `UPDATE users
    SET bio = $1
    WHERE id = $2 `;
    const params = [bio, userId];
    return db.query(q, params);
};
////////////GET USER////////////
module.exports.getUser = (id) => {
    const q = `SELECT first, last, imageurl, bio FROM users WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};
//////////////FIND PEOPLE/////////////////

module.exports.mostRecentUser = () => {
    const q = `SELECT * FROM users ORDER BY id DESC LIMIT 3`;
    return db.query(q);
};
module.exports.findUser = (val) => {
    const q = `SELECT * FROM users
WHERE first ILIKE $1 or last ILIKE $1
LIMIT 6`;
    const params = [val + "%"];
    return db.query(q, params);
};
///////////////////FRIENDSHIP////////////////////
module.exports.checkFriendship = (recipient_id, sender_id) => {
    const q = `SELECT * FROM friendships 
    WHERE (recipient_id = $1 AND sender_id = $2) 
    OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [recipient_id, sender_id];
    return db.query(q, params);
};

module.exports.requestFriendship = (recipient_id, sender_id) => {
    const q = `INSERT INTO friendships (recipient_id, sender_id)
    VALUES ($1, $2)`;
    const params = [recipient_id, sender_id];
    return db.query(q, params);
};

module.exports.endFriendship = (recipient_id, sender_id) => {
    const q = `DELETE FROM friendships
   WHERE (recipient_id = $1 AND sender_id = $2) 
    OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [recipient_id, sender_id];
    return db.query(q, params);
};

module.exports.acceptRequest = (recipient_id, sender_id) => {
    const q = `UPDATE friendships SET accepted = true
   WHERE (recipient_id = $1 AND sender_id = $2) 
    OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [recipient_id, sender_id];
    return db.query(q, params);
};
module.exports.cancelRequest = (recipient_id, sender_id) => {
    const q = `UPDATE friendships SET accepted = false
   WHERE (recipient_id = $1 AND sender_id = $2) 
    OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [recipient_id, sender_id];
    return db.query(q, params);
};

module.exports.getFriends = (userid) => {
    const q = ` SELECT users.id, first, last, imageurl, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND sender_id = users.id);`;
    const params = [userid];
    return db.query(q, params);
};
/////////////////////CHAT/////////////////////////////

module.exports.getMessageSender = (userid) => {
    const q = `SELECT first, last, imageurl from users WHERE id = $1`;
    const params = [userid];
    return db.query(q, params);
};

module.exports.getLastTenMessages = () => {
    const q = ` SELECT chat.id, chat.message, chat.senderId, chat.created_at,
    users.first, users.last, users.imageurl
    FROM chat
    JOIN users
    ON (chat.senderId = users.id)
    ORDER BY chat.id DESC LIMIT 10`;
    return db.query(q);
};

module.exports.newMessage = (message, senderId) => {
    const q = `INSERT INTO chat (message, senderId) 
    VALUES ($1, $2)
    RETURNING *`;
    const params = [message, senderId];
    return db.query(q, params);
};
