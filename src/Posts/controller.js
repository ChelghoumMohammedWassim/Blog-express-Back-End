const pool= require('../db');
const queries= require('./queries');

const createPost= (req, res)=>{
    const {description, add_by}= req.body;
    pool.query(queries.getUserByID, [add_by], (error, result)=>{
        if (error) throw error;
        if (result.rows.length){
            pool.query(queries.createPost, [description, add_by, Date.now()/1000], (error, result)=>{
                if (error) throw error;
                if (result){
                    res.status(201).send('Post created successful.');
                }
            });
        }
        else{
            res.status(204).send('User Not found.');
        }
    });
};


const updatePost= (req, res)=>{
    const {add_by,postID, description}= req.body;
    pool.query(queries.getPostByID, [postID], (error, result)=>{
        if (error) throw error;
        if (result.rows.length){
            if(result.rows[0].add_by == add_by){
                pool.query(queries.updatePost, [postID, description], (error, result)=>{
                    if (error) throw error;
                    if (result){
                        res.status(200).send('Post update successful.');
                    }
                });
            }
            else{
                res.status(204).send('User cant update this post.');
            }
        }
        else{
            res.status(203).send('Post Not found.');
        }
    });
};


const deletePost= (req, res)=>{
    const {postID, add_by}= req.body;
    pool.query(queries.getPostByID, [postID], (error, result)=>{
        if (error) throw error;
        if (result.rows.length){
            if(result.rows[0].add_by == add_by){
                pool.query(queries.deletePostByID, [postID], (error, result)=>{
                    if (error) throw error;
                    if (result){
                        res.status(200).send('Post delete successful.');
                    }
                });
            }
            else{
                res.status(204).send('User cant update this post.');
            }
        }
        else{
            res.status(203).send('Post Not found.');
        }
    });
};

const getPosts = (req, res) => {
    pool.query(queries.getPosts, [], (error, result) => {
        if (error) {
            console.error("Error in getPosts:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result) {
            const postList = result.rows;
            const promises = [];
            postList.forEach(post => {
                const commentsPromise = new Promise((resolve, reject) => {
                    pool.query(queries.getPostComments, [post.id], (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            post.comments = result.rows;
                            resolve();
                        }
                    });
                });
                const likesPromise = new Promise((resolve, reject) => {
                    pool.query(queries.getPostLikes, [post.id], (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            post.likes = result.rows;
                            resolve();
                        }
                    });
                });
                promises.push(commentsPromise, likesPromise);
            });
            Promise.all(promises)
                .then(() => {
                    res.status(200).json(postList);
                })
                .catch(error => {
                    console.error("Error in getPosts:", error);
                    res.status(500).json({ message: "Internal server error" });
                });
        }
    });
};


const getPostsByUserID = (req, res) => {
    const post_id= req.params.id;
    pool.query(queries.getPostByID, [post_id], (error, result) => {
        if (error) {
            console.error("Error in getPosts:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result) {
            const postList = result.rows;
            const promises = [];
            postList.forEach(post => {
                const commentsPromise = new Promise((resolve, reject) => {
                    pool.query(queries.getPostComments, [post.id], (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            post.comments = result.rows;
                            resolve();
                        }
                    });
                });
                const likesPromise = new Promise((resolve, reject) => {
                    pool.query(queries.getPostLikes, [post.id], (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            post.likes = result.rows;
                            resolve();
                        }
                    });
                });
                promises.push(commentsPromise, likesPromise);
            });
            Promise.all(promises)
                .then(() => {
                    res.status(200).json(postList);
                })
                .catch(error => {
                    console.error("Error in getPosts:", error);
                    res.status(500).json({ message: "Internal server error" });
                });
        }
    });
};


module.exports={
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getPostsByUserID
}