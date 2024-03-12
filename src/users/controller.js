const pool = require('../db');
const queries = require('./queries');
const bcrypt= require('bcrypt');

const createUser = (req, res) => {
    const { userName, email, password } = req.body;

    pool.query(
        queries.checkEmailExist,
        [email],
        async (error, result) => {
            
            if (error) throw error;
            
            if (result.rows.length) {
                res.status(203).send('User already exist.');
            }
            
            else {
                const salt= await bcrypt.genSalt();
                const hashedPassword= await bcrypt.hash(password, salt);
                pool.query(
                    queries.createUser,
                    [userName, email, hashedPassword, Date.now()/1000.0],
                    (error, result) => {
                        if (error) throw error;
                        if (result) {
                            res.status(201).send("User created successful.")
                        }
                    }
                )
            }

        }
    );
}


const deleteUser=(req, res)=>{
    const {id}= req.body;
    pool.query(
        queries.getUserByID,
        [id],
        (error, result)=>{
                if (error) throw error;
                if (result.rows.length){
                    pool.query(
                        queries.deleteUser,
                        [id],
                        (error, result)=>{
                            if (error) throw error;
                            if (result){
                                res.status(200).send('User deleted successful');
                            }
                        }
                        );
                }else{
                    res.status(204).send('User does not exist.');
                }
            }
        );
}


const updateUser= (req, res)=>{
    const {id, userName, email, password, oldPassword}= req.body;
    pool.query(
        queries.getUserByID,
        [id],
        (error, result)=>{
                if (error) throw error;
                if (result.rows.length && result.rows[0]['password']=== oldPassword){
                    if (userName){
                        pool.query(
                            queries.updateUserName,
                            [id, userName],
                            (error, result)=>{
                                if (error) throw error;
                            }
                        );
                    }

                    if (email){
                        pool.query(
                            queries.updateUserEmail,
                            [id, email],
                            (error, result)=>{
                                if (error) throw error;
                            }
                        );
                    }

                    if (password){
                        pool.query(
                            queries.updateUserPassword,
                            [id, password],
                            (error, result)=>{
                                if (error) throw error;
                            }
                        );
                    }

                    res.status(200).send('User Updated Successful')

                }else{
                    res.status(203).send('User does not exist or wrong password.');
                }
            }
        );
}


const login= (req, res)=>{
    const {email, password}= req.body;

    pool.query(
        queries.getUserByEmail,
        [email],
        async (error, result) => {
            
            if (error) throw error;
            
            if (result.rows.length) {
                const user= result.rows[0];

                await bcrypt.compare(password, user['password'], (error, result)=>{
                    if(error) throw error;
                    if(result){
                        res.status(200).json({
                            id: user.id,
                            userName: user.username,
                            email: user.email,
                            createdAt: user.createdat
                        });
                    }else{
                        res.status(203).send('Wrong password.');
                    }
                });
            }
            
            else {
                res.status(203).send('User not exist.');
            }

        }
    );
}


module.exports={
    createUser,
    deleteUser,
    updateUser,
    login
}