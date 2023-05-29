const router = require("express").Router();

const { register, login } = require("../controllers/authController");
const { validations, validateRequest } = require("../utils/validations");

const { registerSchema, loginSchema } = validations;

// Register
router.post("/register", validateRequest(registerSchema), register);

// Login
router.post("/login", validateRequest(loginSchema), login);

module.exports = router;
