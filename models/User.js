const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avatar: {
        mimetype: String,
        image: String,
    }
});
const User = mongoose.model('users',UserSchema);

module.exports= User;