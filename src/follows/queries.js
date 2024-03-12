const createFollowRelation= 'INSERT INTO follows (user_id, target, createdAt) VALUES ($1, $2, TO_TIMESTAMP($3))';
const deleteFollowRelation= 'DELETE FROM follows WHERE ID = $1';
const getUserByID= 'SELECT * FROM users WHERE user_id = $1';
const checkIfRelationExist= 'SELECT * FROM follows WHERE user_id= $1 AND target= $2';
const getFollowersByUserID= 'SELECT u.ID, u.username FROM follows AS f JOIN users AS u ON f.target = u.ID WHERE f.user_id = $1';
const getFollowingByUserID= 'SELECT u.ID, u.username FROM follows AS f JOIN users AS u ON f.user_id = u.ID WHERE f.target = $1';

module.exports={
    createFollowRelation,
    deleteFollowRelation,
    checkIfRelationExist,
    getUserByID,
    getFollowingByUserID,
    getFollowersByUserID
}
