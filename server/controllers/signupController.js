import pool from "./../db.js"
import bcrypt from "bcryptjs";
import chalk from "chalk";

export const signupController = async (req, res) => {
    const { email, password, name } = req.body;

    console.log(chalk.blue("Signup request:", "\n name:", name, "\n email:", email));

    if(name.length > 20){
        console.log(chalk.red("Signup failed: name too long"))
        return res.status(400).json({ success: false, message: "Name too long"})
    }

    const salt = bcrypt.genSaltSync(10)
    const hashed_password = bcrypt.hashSync(password, salt)

    await pool.query("INSERT INTO users (email, password, name) VALUES ($1, $2, $3)", [email, hashed_password, name]);

    res.status(201).json({ message: "Signup succesfully" });

    console.log(chalk.green("Signup succesful"))
};

//timothy@gmail.com 123456