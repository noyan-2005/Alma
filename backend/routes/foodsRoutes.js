// Modules
import express from "express";
import Joi from "joi";
import { Op } from "sequelize";
import Food from "../models/food.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get food detail
router.get("/", verifyToken, async (req, res) => {
    // Perform normal search, or search by either food name or category or both.
    const queryObject = {};
    const { foodName, category, page = 1 } = req.query;
    if (foodName) {
        queryObject.food_name = { [Op.like]: `%${foodName}%` };
    }
    if (category) {
        queryObject.category = { [Op.like]: `%${category}%` };
    }
    const pageNumber = +page;
    const limit = 20;
    const offset = limit * (pageNumber - 1);
    const { rows, count } = await Food.findAndCountAll({
        where: queryObject,
        limit: limit,
        offset: offset,
    });
    res.status(200).json({
        page: pageNumber,
        totalPages: Math.ceil(count / limit),
        pageItems: limit,
        total: count,
        foods: rows,
    });
});

// Get a specific food
router.get("/:id", verifyToken, async (req, res) => {
    // Search for that food in the database using its ID
    const food = await Food.findByPk(req.params.id);
    if (!food) {
        res.status(404).json({
            success: false,
            message: "Food not found!",
        });
        return;
    }
    res.status(200).json({
        success: true,
        food: food,
    });
});

// Post a food
router.post("/", verifyToken, async (req, res) => {
    const {
        food_name: food_name,
        category: category,
        calories_per_100: calories_per_100,
        protein_g_per_100: protein_g_per_100,
        carbs_g_per_100: carbs_g_per_100,
        fat_g_per_100: fat_g_per_100,
        sodium_mg_per_100: sodium_mg_per_100,
        sugar_g_per_100: sugar_g_per_100,
        fiber_g_per_100: fiber_g_per_100,
        cholesterol_mg_per_100: cholesterol_mg_per_100,
        calcium_mg_per_100: calcium_mg_per_100,
        iron_mg_per_100: iron_mg_per_100,
        potassium_mg_per_100: potassium_mg_per_100,
        phosphorus_mg_per_100: phosphorus_mg_per_100,
    } = req.body;
    // Validate data
    const foodSchema = Joi.object({
        food_name: Joi.string().required(),
        category: Joi.string().required(),
        calories_per_100: Joi.number().required(),
        protein_g_per_100: Joi.number().required(),
        carbs_g_per_100: Joi.number().required(),
        fat_g_per_100: Joi.number().required(),
        sodium_mg_per_100: Joi.number().required(),
        sugar_g_per_100: Joi.number().required(),
        fiber_g_per_100: Joi.number().required(),
        cholesterol_mg_per_100: Joi.number().required(),
        calcium_mg_per_100: Joi.number().required(),
        iron_mg_per_100: Joi.number().required(),
        potassium_mg_per_100: Joi.number().required(),
        phosphorus_mg_per_100: Joi.number().required(),
    });
    const { value, error } = foodSchema.validate({
        food_name: food_name,
        category: category,
        calories_per_100: calories_per_100,
        protein_g_per_100: protein_g_per_100,
        carbs_g_per_100: carbs_g_per_100,
        fat_g_per_100: fat_g_per_100,
        sodium_mg_per_100: sodium_mg_per_100,
        sugar_g_per_100: sugar_g_per_100,
        fiber_g_per_100: fiber_g_per_100,
        cholesterol_mg_per_100: cholesterol_mg_per_100,
        calcium_mg_per_100: calcium_mg_per_100,
        iron_mg_per_100: iron_mg_per_100,
        potassium_mg_per_100: potassium_mg_per_100,
        phosphorus_mg_per_100: phosphorus_mg_per_100,
    });
    if (error) {
        res.status(400).json(error.details[0].message);
        return;
    }
    // Check whethear this food is already in the database or not
    const food = await Food.findOne({ where: { food_name: food_name } });
    if (food) {
        res.status(409).json({
            success: false,
            message: "This food item already exists in the database!",
        });
        return;
    }
    try {
        const food = await Food.create(value);
        res.status(201).json(food);
    } catch (error) {
        let errorMessage = error.message;
        if (error.error) {
            for (const item of error.errors) {
                errorMessage += `\n${item.message}`;
            }
        }
        res.status(400).json(errorMessage);
        return;
    }
});

// Edit a specific food
router.put("/:id", verifyToken, async (req, res) => {
    // Search for that food in the database using its ID
    const food = await Food.findByPk(req.params.id);
    if (!food) {
        res.status(404).json({
            success: false,
            message: "Food not found!",
        });
        return;
    }
    const {
        food_name: food_name,
        category: category,
        calories_per_100: calories_per_100,
        protein_g_per_100: protein_g_per_100,
        carbs_g_per_100: carbs_g_per_100,
        fat_g_per_100: fat_g_per_100,
        sodium_mg_per_100: sodium_mg_per_100,
        sugar_g_per_100: sugar_g_per_100,
        fiber_g_per_100: fiber_g_per_100,
        cholesterol_mg_per_100: cholesterol_mg_per_100,
        calcium_mg_per_100: calcium_mg_per_100,
        iron_mg_per_100: iron_mg_per_100,
        potassium_mg_per_100: potassium_mg_per_100,
        phosphorus_mg_per_100: phosphorus_mg_per_100,
    } = req.body;
    // Validate data
    const foodSchema = Joi.object({
        food_name: Joi.string(),
        category: Joi.string(),
        calories_per_100: Joi.number(),
        protein_g_per_100: Joi.number(),
        carbs_g_per_100: Joi.number(),
        fat_g_per_100: Joi.number(),
        sodium_mg_per_100: Joi.number(),
        sugar_g_per_100: Joi.number(),
        fiber_g_per_100: Joi.number(),
        cholesterol_mg_per_100: Joi.number(),
        calcium_mg_per_100: Joi.number(),
        iron_mg_per_100: Joi.number(),
        potassium_mg_per_100: Joi.number(),
        phosphorus_mg_per_100: Joi.number(),
    });
    const { value, error } = foodSchema.validate({
        food_name: food_name,
        category: category,
        calories_per_100: calories_per_100,
        protein_g_per_100: protein_g_per_100,
        carbs_g_per_100: carbs_g_per_100,
        fat_g_per_100: fat_g_per_100,
        sodium_mg_per_100: sodium_mg_per_100,
        sugar_g_per_100: sugar_g_per_100,
        fiber_g_per_100: fiber_g_per_100,
        cholesterol_mg_per_100: cholesterol_mg_per_100,
        calcium_mg_per_100: calcium_mg_per_100,
        iron_mg_per_100: iron_mg_per_100,
        potassium_mg_per_100: potassium_mg_per_100,
        phosphorus_mg_per_100: phosphorus_mg_per_100,
    });
    if (error) {
        res.status(400).json(error.details[0].message);
        return;
    }
    try {
        await food.update(value);
        res.status(200).json({
        success: true,
        message: "Food has been edited.",
        food: food,
    });
    } catch (error) {
        let errorMessage = error.message;
        if (error.error) {
            for (const item of error.errors) {
                errorMessage += `\n${item.message}`;
            }
        }
        res.status(400).json(errorMessage);
        return;
    }
});

// Delete a specific food
router.delete("/:id", verifyToken, async (req, res) => {
    // Search for that food in the database using its ID
    const food = await Food.findByPk(req.params.id);
    if (!food) {
        res.status(404).json({
            success: false,
            message: "Food not found!",
        });
        return;
    }
    await food.destroy();
    res.status(204).json({
        success: true,
        message: `Food with ID number ${req.params.id} deleted successfully.`,
    });
});

// Undo delete a food record
router.put("/:id/undo", verifyToken, async (req, res) => {
    // Search for that food in the database using its ID
    const food = await Food.findByPk(req.params.id, { paranoid: false });
    if (!food) {
        res.status(404).json({
            success: false,
            message: "Food not found!",
        });
        return;
    }
    // Check if it is tagged as deleted or not
    if (!food.isSoftDeleted()) {
        res.status(404).json({
            success: false,
            message: "Food is not deleted!",
        });
        return;
    }
    await food.setDataValue("deletedAt", null);
    await food.save();
    res.status(200).json({
        success: true,
        message: `Food with ID number ${req.params.id} restored successfully.`,
    });
});

export default router;
