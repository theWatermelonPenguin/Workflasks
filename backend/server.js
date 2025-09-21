import express from "express";
import cors from "cors";
import signupRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";

const server = express();
server.use(express.json());
server.use(cors());

// Mount the separate route files
server.use("/api/signup", signupRouter);
server.use("/api/login", loginRouter);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
