import pool from "../db.js";
import jwt from "jsonwebtoken"
import "dotenv/config"

export const saveController = async (req, res) => {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY
    const jwtSecretKey = process.env.JWT_SECRET_KEY

    console.log(req.body)

    const {title, triggerType, trigger, actionType, action, contents, workflaskId} = req.body
    const token = await req.header(tokenHeaderKey)

    const verified = jwt.verify(token, jwtSecretKey);
    if(verified) {
        const userid = verified.userid
        const name = verified.name
        const searchResult = await pool.query("SELECT * FROM workflasks WHERE id = $1 LIMIT 1", [workflaskId])

        if(searchResult.rows.length !== 0) {
            await pool.query("UPDATE workflasks SET title = $1, triggertype = $2, trigger = $3, actiontype = $4, action = $5, contents = $6, updated_at = NOW() WHERE id = $7", [title, triggerType, trigger, actionType, action, contents, workflaskId])
        } else {
            await pool.query("INSERT INTO workflasks (userid, trigger, action, triggertype, actiontype, contents, title) VALUES ($1, $2, $3, $4, $5, $6, $7)", [userid, trigger, action, triggerType, actionType, contents, title,])
        }
        console.log("Workflask saved for user", name)
        res.status(201).json({success: true, message: "Saved succesfully"})
    } else if (!verified) {
        console.log("Save failed for user")
        return res.status(401).json({ success: false, message: "Session is invalid"})
    }
}