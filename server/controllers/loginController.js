import pool from "./../db.js"
import bcrypt from "bcryptjs";
import chalk from "chalk"

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    console.log(chalk.blue("Incoming login request for user:", email))

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])

    if(result.rows.length === 0){
        console.log(chalk.red("Log in failed for user:", email))
        return res.status(401).json({ success: false, message: "Email or password incorrect"})
    }

    const user = result.rows[0]
    const valid = bcrypt.compareSync(password, user.hashed_password)

    if(!valid){
        console.log(chalk.red("Log in failed for user:", email))
        return res.status(401).json({ success: false, message: "Email or password incorrect"})
    }

    console.log(chalk.green("Log in successful for user:", email))
    res.json({ success:true, message: "Logged in successfully"})
};