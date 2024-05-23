const db = require('../models/database.js');

const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const users = await db.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);

        if (users.rows.length === 0) {
            await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
            res.cookie("username", username);
            res.status(200).json({ message: "User successfully added", data: { username, email } });
        } else {
            res.json({ message: "Username or email already exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "User is not added" });
    }
}

const checkAdmin = (user) => {
    if (user.admin === true) {
        return { message: "Admin user", data: { username: user.username, email: user.email } };
    }
    return null;
};

const login = async (req, res, next) => {
    try {
        const users = await db.query(`SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`)
        const user = users.rows[0];
        const adminResponse = checkAdmin(user);
        if (adminResponse) {
            return res.status(200).json({adminResponse});
        }
        if (user.username === req.body.username && user.password === req.body.password) {
            res.cookie("username", `${req.body.username}`)
            res.status(200).json({message:"user found", data:{username: user.username, email: user.email, password:  user.password}})
        } else {
            res.json({message:"username or password is incorrect"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"user is not found"})
    }
}


module.exports ={ signup, login}
