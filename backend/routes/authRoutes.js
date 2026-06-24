// Modules
import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
    // Get data needed for creating a new user
    const {
        first_name: regFirstName,
        last_name: regLastName,
        mobile: regMobile,
        username: regUsername,
        email: regEmail,
        password: regPassword,
        role: regRole,
    } = req.body;
    // Validate data
    const userSchema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        mobile: Joi.string().length(11).required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string(),
    });
    const { value, error } = userSchema.validate({
        first_name: regFirstName,
        last_name: regLastName,
        mobile: regMobile,
        username: regUsername,
        email: regEmail,
        password: regPassword,
        role: regRole,
    });
    if (error) {
        res.status(400).json(error.details[0].message);
        return;
    }
    // Check whethear this user with the given mobile number exists on the DB or not
    const user = await User.findOne({ where: { mobile: regMobile } });
    if (user) {
        res.status(409).json({
            success: false,
            message: "This mobile number is already registered!",
        });
        return;
    }
    try {
        // Password will be hashed before saving on the DB
        // It won't be visible in the response
        value.password = await bcrypt.hash(regPassword, 10);
        const user = await User.create(value);
        const hiddenUserPassword = { ...user.toJSON(), password: "***" };
        res.status(201).json(hiddenUserPassword);
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

router.post("/login", async (req, res) => {
    // Get user credentials
    const { email: loginEmail, password: loginPassword } = req.body;
    // Make sure the user will enter both email and password fields
    if (!loginEmail || !loginPassword) {
        res.status(400).json({
            success: false,
            message: "Please fill up email address and password fields.",
        });
        return;
    }
    // Check whethear this user with the given mobile number exists on the DB or not
    const user = await User.findOne({ where: { email: loginEmail } });
    if (!user) {
        res.status(401).json({
            success: false,
            message: "Invalid credentials",
        });
        return;
    }
    // Make sure the credentials are correct
    const validPassword = await bcrypt.compare(loginPassword, user.password);
    if (!validPassword) {
        res.status(401).json({
            success: false,
            message: "Invalid credentials",
        });
        return;
    }
    res.status(200).json({
        success: true,
        message: "User ogged in.",
    });
});

router.post("/logout", async (req, res) => {
    // Stateless for now
    // Client side should delete the token
    res.status(200).json({
        success: true,
        message: "User logged out.",
    });
});

export default router;
