const pool = require('../db');
const queries = require('./queries');

const createFollowRelation = (req, res) => {
    const { user_id, target } = req.body;
    if (user_id != target) {
        pool.query(
            queries.checkIfRelationExist,
            [user_id, target],
            (error, result) => {
                if (error) throw error;
                if (result.rows.length) {
                    res.status(200).send('Relation already exist.');
                }
                else {
                    pool.query(
                        queries.createFollowRelation,
                        [user_id, target, Date.now()/1000],
                        (error, result) => {
                            if (error) throw error;
                            if (result) res.status(201).send('Relation created successful.');
                        }
                    );
                }
            }
        );
    } else {
        res.status(200).send('Users can not follow them self.');
    }
};


const deleteFollowRelation = (req, res) => {
    const { user_id, target } = req.body;
    pool.query(
        queries.checkIfRelationExist,
        [user_id, target],
        (error, result) => {
            if (error) throw error;
            if (result.rows.length) {
                const relation= result.rows[0];
                console.log(relation['id']);

                pool.query(queries.deleteFollowRelation,[relation['id']], (error, result)=>{
                    if (error) throw error;
                    if (result) res.status(200).send('Relation deleted successful.');
                });

            }
            else {
                res.status(204).send('Relation not exist.');
            }
        }
    );
};

const getFollowersByUserID= (req, res)=>{
    const {id} = req.body;

    pool.query(queries.getFollowersByUserID, [id], (error, result)=>{
        if (error) throw error;
        if (result){
            res.status(200).json(result.rows);
        }
    });
};

const getFollowingsByUserID= (req, res)=>{
    const {id} = req.body;

    pool.query(queries.getFollowingByUserID, [id], (error, result)=>{
        if (error) throw error;
        if (result){
            res.status(200).json(result.rows);
        }
    });
};

module.exports = {
    createFollowRelation,
    deleteFollowRelation,
    getFollowersByUserID,
    getFollowingsByUserID
};