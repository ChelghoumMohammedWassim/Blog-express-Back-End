const createUser= 'INSERT INTO users ( userName, email, password, createdAt) VALUES ($1, $2, $3, TO_TIMESTAMP($4))';
const deleteUser= 'DELETE FROM users WHERE ID = $1';
const updateUserName= 'UPDATE users SET userName = $2 WHERE ID = $1';
const updateUserEmail= 'UPDATE users SET email = $2 WHERE ID = $1';
const updateUserPassword= 'UPDATE users SET password = $2 WHERE ID = $1';
const getUserByID= 'SELECT * FROM users WHERE id = $1';
const getUserByEmail= 'SELECT * FROM users Where email = $1';

module.exports= {
    createUser,
    deleteUser,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    getUserByID,
    getUserByEmail
}