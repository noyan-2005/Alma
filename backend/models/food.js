import { DataTypes } from "sequelize";
import database from "../database/db.js";

const Food = database.define(
    "foods",
    {
        food_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        food_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        calories_per_100: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        protein_g_per_100: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        carbs_g_per_100: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        fat_g_per_100: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        sodium_mg_per_100: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        sugar_g_per_100: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        fiber_g_per_100: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        cholesterol_mg_per_100: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        calcium_mg_per_100: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        iron_mg_per_100: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        potassium_mg_per_100: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        phosphorus_mg_per_100: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    { paranoid: true, indexes: [{ unique: true, fields: ["food_name"] }] },
);

export default Food;
