"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth"); // Adjust this path based on your file structure
const router = (0, express_1.Router)(); // Create a new router instance
// POST endpoint to generate a token
router.post('/api/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body; // Extract email from request body
    // Check if the email is provided
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    // Generate the token using the provided email
    const token = (0, auth_1.generateToken)(email);
    // Send the generated token in the response
    return res.json({ token });
}));
// Additional endpoint for testing purposes
router.get('/api/test', (req, res) => {
    return res.json({ message: 'Test endpoint is working' });
});
// Export the router
exports.default = router;
