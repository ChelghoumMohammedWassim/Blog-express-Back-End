const checkUserIfExist= 'SELECT * FROM users WHERE ID= $1';
const checkPostIfExist= 'SELECT * FROM posts WHERE ID= $1';
const createLike= 'INSERT INTO likes (user_id , post_id  , createdAt) VALUES ($1, $2, TO_TIMESTAMP($3))';
const checkIfLikeExist= 'SELECT * FROM likes WHERE user_id= $1 AND post_id=$2';
const deleteLike= 'DELETE FROM likes WHERE ID= $1';
const getPostLikes= 'SELECT u.userName, u.ID AS user_id, l.post_id FROM likes AS l JOIN users AS u ON l.user_id = u.ID WHERE l.post_id= $1';


module.exports={
    checkIfLikeExist,
    checkPostIfExist,
    checkUserIfExist,
    createLike,
    deleteLike,
    getPostLikes
}