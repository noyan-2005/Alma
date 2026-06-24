import { DataTypes } from "sequelize";
import database from "../database/db.js";

const DailyLog = database.define("daily_logs", {
    log_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    food_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount_grams: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    meal: {
        type: DataTypes.ENUM("breakfast", "lunch", "dinner", "snack"),
        allowNull: false,
    },
    log_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
});

export default DailyLog;
