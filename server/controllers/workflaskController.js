import pool from "../db.js";
import jwt from "jsonwebtoken"

export const workflaskController = async (req, res) => {

    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY
    const jwtSecretKey = process.env.JWT_SECRET_KEY

    const token = await req.header(tokenHeaderKey)
    
    const verified = jwt.verify(token, jwtSecretKey);

    if(verified) {
        const { id } = req.body

        const result = await pool.query("SELECT * FROM workflasks WHERE id = $1", [id])

        res.json({result : result.rows[0]})
    }
}