// Modules
import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

// Get all users (admin only)
router.get("/", async (req, res) => {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
});

// Get a specific user
router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found!",
        });
        return;
    }
    res.status(200).json(user);
});

// Edit user info
router.put("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found!",
        });
        return;
    }
    const {
        first_name: newFirstName,
        last_name: newLastName,
        username: newUserName,
        mobile: newMobile,
        email: newEmail,
        password: newPassword,
        role: newRole,
    } = req.body;
    const userSchema = Joi.object({
        first_name: Joi.string(),
        last_name: Joi.string(),
        username: Joi.string(),
        mobile: Joi.string().length(11),
        email: Joi.string().email(),
        password: Joi.string(),
        role: Joi.string(),
    });
    const { value, error } = userSchema.validate({
        first_name: newFirstName,
        last_name: newLastName,
        username: newUserName,
        mobile: newMobile,
        email: newEmail,
        password: newPassword,
        role: newRole,
    });
    if (error) {
        res.status(400).json(error.details[0].message);
        return;
    }
    try {
        if (value.password) {
            value.password = await bcrypt.hash(newPassword, 10);
        }
        await user.update(value);
        const hiddenUserPassword = { ...user.toJSON(), password: "***" };
        res.status(200).json(hiddenUserPassword);
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

// Delete user
router.delete("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found!",
        });
        return;
    }
    user.destroy();
    const hiddenUserPassword = { ...user.toJSON(), password: "***" };
    res.status(201).json(hiddenUserPassword);
});

export default router;
