const queries = require('./queries');
const pool = require('../db');

const getPostComments= (req, res)=>{
    const {post_id}= req.body;
    pool.query( queries.getPostComments, [post_id], (error, result)=>{
        if (error) throw error;
        if (result)
            res.status(200).json(result.rows);
    });
}


const createComment= (req, res)=>{
    const {user_id, post_id, content}= req.body;
    
    pool.query(queries.checkUserIfExist, [user_id], (error, result)=>{
        if (error) throw error;
        if (result.rows.length){
            pool.query(queries.checkPostIfExist, [post_id], (error, result)=>{
                if (error) throw error;
                if (result.rows.length){
                    pool.query(
                        queries.checkIfCommentExist,
                        [user_id, post_id],
                        (error, result)=>{
                            if (error) throw error;
                            if (result.rows.length){
                                res.status(204).send('Comment already exist.');
                            }
                            else{
                                pool.query(
                                    queries.createComment,
                                    [user_id, post_id, content, Date.now()/1000],
                                    (error, result)=>{
                                        if (error) throw error;
                                        if (result){
                                            res.status(201).send('Comment created successful.');
                                        }
                                    }
                                    )
                            }
                        }
                        );
                }else{
                    res.status(204).send('Post not exist.');
                }
            })
        }else{
            res.status(204).send('User not exist.');
        }
    });
}


const updateComment= (req, res)=>{
    const {user_id, post_id, content}= req.body;

    pool.query(
        queries.checkIfCommentExist,
        [user_id, post_id],
        (error, result)=>{
            if (error) throw error;
            if (result.rows.length){
                const dbComment= result.rows[0];
                pool.query(queries.updateComment, [dbComment.id, content], (error, result)=>{
                    if (error) throw error;
                    if (result){
                        res.status(200).send('Comment Updated Successful.');
                    }
                });
            }
            else{
                res.status(204).send('Comment not exist.');
            }
        }
        );
}


const deleteComment= (req, res)=>{
    const {user_id, post_id, content}= req.body;

    pool.query(
        queries.checkIfCommentExist,
        [user_id, post_id],
        (error, result)=>{
            if (error) throw error;
            if (result.rows.length){
                const dbComment= result.rows[0];
                pool.query(queries.deleteComment, [dbComment.id], (error, result)=>{
                    if (error) throw error;
                    if (result){
                        res.status(200).send('Comment deleted Successful.');
                    }
                });
            }
            else{
                res.status(204).send('Comment not exist.');
            }
        }
        );
}


module.exports={
    getPostComments,
    createComment,
    updateComment,
    deleteComment
}