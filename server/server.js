import express from "express";
import cors from "cors";
import signupRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";
import saveRouter from "./routes/save.js"
import workflasksRouter from "./routes/workflasks.js"
import workflaskRouter from "./routes/workflask.js"

const server = express();
server.use(express.json());
server.use(cors());

// Mount the separate route files
server.use("/api/signup", signupRouter);
server.use("/api/login", loginRouter);
server.use("/api/save", saveRouter)
server.use("/api/workflasks", workflasksRouter)
server.use("/api/workflask", workflaskRouter)

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
