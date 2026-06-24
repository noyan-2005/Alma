// Relations between models
import User from "./user.js";
import Food from "./food.js";
import DailyLog from "./dailylog.js";

// Relations

// Relation between User, Food (many-to-many)
User.hasMany(DailyLog, { foreignKey: "user_id" });
Food.hasMany(DailyLog, { foreignKey: "food_id" });
DailyLog.belongsTo(User, { foreignKey: "user_id" });
DailyLog.belongsTo(Food, { foreignKey: "food_id" });

// Relation between Category and Food (one-to-many)
