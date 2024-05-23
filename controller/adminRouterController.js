const db = require('../models/database.js');

const getUsers = async (req, res) => {
    try {
        const users = await db.query(`SELECT * FROM users`);
        res.status(200).json({message:"Success", data:users.rows});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error occure while get users" + error})
    }
}

const updateUser = async (req, res) => {
    const { username , email , password , admin} = req.body;
    const {id} = req.params;
    try {
        const user = await db.query(`UPDATE users SET username = $1 , email = $2 , password = $3, admin = $4 WHERE id = $5`, [username, email, password, admin, id]);
        res.status( 200 ).json({message:"user updated successfully", data:{username:username, email:email, password:password, admin:admin}})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error occure while update user" + error})
    }
}

const deleteUser = async (req, res) => {
    try {
        const deleteUser  = await db.query(`DELETE FROM users WHERE id = $1`, [req.params.id]);
        res.status(200).json({message:"user deleted successfully", data:{deleteUser}})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error occure while delete user" + error})
    }
}

module.exports ={
    updateUser,
    deleteUser,
    getUsers
}