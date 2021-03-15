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
module.exports.getSecretCode = (secret) => {
    const q = `SELECT secret FROM reset_codes WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes `;
    const params = [secret];
    return db.query(q, params);
};
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
    WHERE id = $2 `;
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
    const q = `SELECT first, last, imageUrl, bio FROM users WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};
