import pool from "./../db.js"
import bcrypt from "bcryptjs";
import chalk from "chalk"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
//Lizard mangu@gmail 123456
export const loginController = async (req, res) => {
    const { email, password } = req.body;

    console.log(chalk.blue("Incoming login request for user:", email))

    const search = await pool.query("SELECT * FROM users WHERE email = $1 LIMIT 1", [email])

    if(search.rows.length === 0){
        console.log(chalk.red("Log in failed for user:", email))
        return res.status(401).json({ success: false, message: "Email or password incorrect"})
    }

    const user = search.rows[0]
    const valid = bcrypt.compareSync(password, user.password)

    if(!valid){
        console.log(chalk.red("Log in failed for user:", email))
        return res.status(401).json({ success: false, message: "Email or password incorrect"})
    }

    const name = search.rows[0].name;
    const userid = search.rows[0].id

    
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    let data = {
        userid: userid,
        name: name,
        email: email
    }
    const token = jwt.sign(data, jwtSecretKey);

    console.log(chalk.green("Log in successful for user:", email, token))
    res.json({ success: true, message: "Logged in successfully", token: token})
};

//bob@gmail.com timothy 123456