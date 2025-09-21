import pool from "./../db.js"
import bcrypt from "bcryptjs";

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])

    if(result.rows.length === 0){
        return res.status(401).json({ success: false, message: "Email or password incorrect"})
    }

    const user = result.rows[0]
    const valid = bcrypt.compareSync(password, user.hashed_password)

    if(!valid){
        return res.status(401).json({ success: false, message: "Email or password incorrect"})
    }

    res.json({ success:true, message: "Logged in succsefuly"})
};