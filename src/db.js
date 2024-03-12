const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'twitter',
    password: 'admin',
    port: 5432
});

pool.query('CREATE TABLE IF NOT EXISTS users (ID SERIAL PRIMARY KEY, userName VARCHAR(255), email VARCHAR(255), password VARCHAR(255), createdAt TIMESTAMP)',
(error, result)=>{
    if (error) throw error;
});

pool.query('CREATE TABLE IF NOT EXISTS posts (ID SERIAL PRIMARY KEY, description VARCHAR(255), add_by INT, createdAt TIMESTAMP, FOREIGN KEY(add_by) REFERENCES users(ID))',
(error, result)=>{
    if (error) throw error;
});

pool.query('CREATE TABLE IF NOT EXISTS follows (ID SERIAL PRIMARY KEY, user_id INT, target INT, createdAt TIMESTAMP, FOREIGN KEY(user_id) REFERENCES users(ID),FOREIGN KEY(target) REFERENCES users(ID))',
(error, result)=>{
    if (error) throw error;
});


pool.query('CREATE TABLE IF NOT EXISTS comments (ID SERIAL PRIMARY KEY, user_id INT, post_id INT, content TEXT, createdAt TIMESTAMP, FOREIGN KEY(user_id) REFERENCES users(ID),FOREIGN KEY(post_id) REFERENCES posts(ID))',
(error, result)=>{
    if (error) throw error;
});

pool.query('CREATE TABLE IF NOT EXISTS likes (ID SERIAL PRIMARY KEY, user_id INT, post_id INT, createdAt TIMESTAMP, FOREIGN KEY(user_id) REFERENCES users(ID),FOREIGN KEY(post_id) REFERENCES posts(ID))',
(error, result)=>{
    if (error) throw error;
});

module.exports= pool;