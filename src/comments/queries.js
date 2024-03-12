const checkUserIfExist= 'SELECT * FROM users WHERE ID= $1';
const checkPostIfExist= 'SELECT * FROM posts WHERE ID= $1';
const createComment= 'INSERT INTO comments (user_id , post_id , content , createdAt) VALUES ($1, $2, $3, TO_TIMESTAMP($4))';
const updateComment= 'UPDATE comments SET content = $2 WHERE ID= $1';
const checkIfCommentExist= 'SELECT * FROM comments WHERE user_id= $1 AND post_id=$2';
const deleteComment= 'DELETE FROM comments WHERE ID= $1';
const getPostComments= 'SELECT u.userName, u.ID AS user_id, c.content, c.createdAt FROM comments AS c JOIN users AS u ON c.user_id = u.ID WHERE c.post_id = $1';


module.exports= {
    createComment,
    updateComment,
    checkIfCommentExist,
    checkPostIfExist,
    checkUserIfExist,
    deleteComment,
    getPostComments
}