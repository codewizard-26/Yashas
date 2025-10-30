const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { stringify } = require("querystring");


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lower: true
    },
    phone:{
        type: Intl,
        required: true,
        length: 10,
        unique: true
    },
    password:{
        type: String,
        required: true,
        length: 8
    },
    name:{
        type: String,
        required: true
    }
})