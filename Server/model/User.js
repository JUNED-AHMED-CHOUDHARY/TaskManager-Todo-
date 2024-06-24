const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: [true, "Name is required"], 
            minLength: [3, "Name length at least 3 characters"], 
            maxLength: [50, "name can have at max 50 characters"], 
        }, 
        email: {
            type: String, 
            required: [true, "email is required"], 
            validate: [validator.isEmail, "please enter valid email"], 
        }, 
        phone: {
            type: Number, 
            required: [true, "number is required"], 
        }, 
        password: {
            type: String, 
            required: [true, "password is required"], 
            minLength: [3, "password length at least 3 characters"], 
            maxLength: [100, "password can have at max 100 characters"], 
        }, 
        image: {
            type: String, 
            required: true,
        }, 
        createdAt: {
            type: Date, 
            default: Date.now(), 
        }
    }
);

module.exports = mongoose.model("User", userSchema);