// Modules
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
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
        await database.sync({ force: true });
        app.listen(5000, () => {
            console.log("🚀 Server running at http://localhost:5000 ...");
            console.log("- Check API Health\t:\t/health");
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();
