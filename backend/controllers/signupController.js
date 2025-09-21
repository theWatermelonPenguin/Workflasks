import pool from "./../db.js"
import bcrypt from "bcryptjs";

export const signupController = async (req, res) => {
    const { email, password } = req.body;

    const salt = bcrypt.genSaltSync(10)
    const hashed_password = bcrypt.hashSync(password, salt)

    const params = await pool.query("INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING id, email", [email, hashed_password]);

    console.log("Signup request:", email, hashed_password);

    res.status(201).json({ message: "User signed up successfully!" });
};