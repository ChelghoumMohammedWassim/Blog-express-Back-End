const createPost= 'INSERT INTO posts (description, add_by, createdAt) VALUES ($1, $2, TO_TIMESTAMP($3))';
const getPostByID= 'SELECT * FROM posts WHERE add_by= $1';
const getPosts= 'SELECT * FROM posts';
const updatePost= 'UPDATE posts SET description = $2 WHERE ID = $1';
const getUserByID= 'SELECT * FROM users WHERE ID = $1';
const deletePostByID= 'DELETE FROM posts WHERE ID= $1';
const getPostComments= 'SELECT u.userName, u.ID AS user_id, c.content, c.createdAt FROM comments AS c JOIN users AS u ON c.user_id = u.ID WHERE c.post_id = $1';
const getPostLikes= 'SELECT u.userName, u.ID AS user_id FROM likes AS l JOIN users AS u ON l.user_id = u.ID WHERE l.post_id= $1';

module.exports={
    createPost,
    getPostByID,
    updatePost,
    getUserByID,
    deletePostByID,
    getPostComments,
    getPostLikes,
    getPosts
}