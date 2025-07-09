const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    userId:{
        type: String,
        trim:true
    },
    token:{
        type:String,
        trim:true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        trim: true,
        ref: 'Token',
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        trim: true,
        ref: 'Token',
    }
},{ 
    timestamps: true, 
    versionKey: false,
    id: false,
    toJSON: { virtuals: true }
  })
module.exports = mongoose.model('Token',tokenSchema)