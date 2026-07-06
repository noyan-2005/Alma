// Modules
import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all users (admin only)
router.get("/", verifyToken, async (req, res) => {
    const allUsers = await User.findAll({
        attributes: { exclude: ["password"] },
    });
    res.status(200).json(allUsers);
});

// Get a specific user (admin only)
// ! NOTE: ONLY USERS THAT ARE LOGGED IN CAN USE THIS ROUTE. AND THEY CAN USE
// ! THIS ROUTE ONLY AND ONLY IF THEY WANT TO SEE THEIR OWN PROFILE BY CLICKING
// ! ON THE PROFILE BUTTON IN THE WEBSITE
router.get("/:id", verifyToken, async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found!",
        });
        return;
    }
    const safeUser = user.toJSON();
    delete safeUser.password;
    res.status(200).json({
        success: true,
        user: safeUser,
    });
});

// Edit user info
router.put("/:id", verifyToken, async (req, res) => {
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
        const safeUser = user.toJSON();
        delete safeUser.password;
        res.status(200).json({
            success: true,
            message: "User has been edited!",
            user: safeUser,
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

// Delete user
router.delete("/:id", verifyToken, async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found!",
        });
        return;
    }
    user.destroy();
    const safeUser = user.toJSON();
    delete safeUser.password;
    res.status(201).json({
        success: true,
        message: "User has been deleted!",
        user: safeUser,
    });
});

export default router;
