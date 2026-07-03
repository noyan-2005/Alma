// Modules
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import database from "./database/db.js";

// Models
import User from "./models/user.js";
import Food from "./models/food.js";
import DailyLog from "./models/dailylog.js";

// Relations
import "./models/associations.js";

// Routes
import usersRoutes from "./routes/usersRoutes.js";
import foodsRoutes from "./routes/foodsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Load .env file
dotenv.config();

// Essentials
const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(
    cors({
        origin: ["http://localhost:5500", "http://127.0.0.1:5500"], // For VSCode Live Server
    }),
);

// Routes
app.use("/auth", authRoutes);
app.use("/foods", foodsRoutes);
app.use("/users", usersRoutes);

// Check server health
app.get("/health", (req, res) => {
    res.status(200).send({
        status: "OK",
        message: "✅ Healthy",
        timestamp: new Date().toLocaleString(),
    });
});

// Start server
async function startServer() {
    try {
        await database.sync();
        app.listen(5000, () => {
            console.log("🚀 Server running at http://localhost:5000 ...");
            console.log("- Check API Health\t:\t/health");
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();
