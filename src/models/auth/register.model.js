const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true 
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required: true,
        enum:['User','Admin','Super_Admin'],
        default: 'user'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register',
        default:null,
        trim: true,
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register',
        default:null,
        trim: true,
    }
},{versionKey:false,timestamps: true })

module.exports = mongoose.model('Register',registerSchema)