import pg, { Pool } from "pg"

const pool = new Pool({
    user: "workflasks_dev_account",   // your DB username
    host: "localhost",
    database: "workflasks_dev_db",       // your actual database name
    password: "workflasksDEVpassword",
    port: 5432,  
})

export default pool