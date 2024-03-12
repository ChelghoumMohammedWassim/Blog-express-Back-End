const queries = require('./queries');
const pool = require('../db');

const getPostLikes= (req, res)=>{
    const {post_id}= req.body;
    pool.query( queries.getPostLikes, [post_id], (error, result)=>{
        if (error) throw error;
        if (result)
            res.status(200).json(result.rows);
    });
}


const createLike= (req, res)=>{
    const {user_id, post_id}= req.body;
    
    pool.query(queries.checkUserIfExist, [user_id], (error, result)=>{
        if (error) throw error;
        if (result.rows.length){
            pool.query(queries.checkPostIfExist, [post_id], (error, result)=>{
                if (error) throw error;
                if (result.rows.length){
                    pool.query(
                        queries.checkIfLikeExist,
                        [user_id, post_id],
                        (error, result)=>{
                            if (error) throw error;
                            if (result.rows.length){
                                res.status(204).send('Like already exist.');
                            }
                            else{
                                pool.query(
                                    queries.createLike,
                                    [user_id, post_id, Date.now()/1000],
                                    (error, result)=>{
                                        if (error) throw error;
                                        if (result){
                                            res.status(201).send('Like created successful.');
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


const deleteLike= (req, res)=>{
    const {user_id, post_id}= req.body;

    pool.query(
        queries.checkIfLikeExist,
        [user_id, post_id],
        (error, result)=>{
            if (error) throw error;
            if (result.rows.length){
                const dbLike= result.rows[0];
                console.log(dbLike);
                pool.query(queries.deleteLike, [dbLike.id], (error, result)=>{
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
    getPostLikes,
    createLike,
    deleteLike
}