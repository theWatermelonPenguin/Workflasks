import pool from "../db.js";
import jwt from "jsonwebtoken"
import "dotenv/config"

export const saveController = async (req, res) => {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY
    const jwtSecretKey = process.env.JWT_SECRET_KEY

    const {trigger, action} = req.body
    const token = await req.header(tokenHeaderKey)
    console.log(token)

    const verified = jwt.verify(token, jwtSecretKey);
    if(verified) {
        const userid = verified.userid
        const name = verified.name
        await pool.query("INSERT INTO workflasks (userid, trigger, action) VALUES ($1, $2, $3)", [userid, trigger, action])
        
        console.log("Workflask saved for user", name)
        res.status(201).json({success: true, message: "Saved succesfully"})
    } else if (!verified) {
        console.log("Save failed for user")
        return res.status(401).json({ success: false, message: "Session is invalid"})
    }
}