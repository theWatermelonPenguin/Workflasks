import pool from "../db.js";
import jwt from "jsonwebtoken"

export const workflasksController = async (req, res) => {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY
    const jwtSecretKey = process.env.JWT_SECRET_KEY

    const token = await req.header(tokenHeaderKey)
    
    const verified = jwt.verify(token, jwtSecretKey);

    if(verified) {
        const userid = verified.userid

        const { rows } = await pool.query("SELECT * FROM workflasks WHERE userid = $1", [userid])
        res.json({data: rows})
    }
}