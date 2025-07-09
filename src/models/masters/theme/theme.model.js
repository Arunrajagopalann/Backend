const mongoose = require('mongoose');
const themeConst = require('../../../utils/theme.utils')
const themeSchema =  mongoose.Schema({
    title: {
        type: String,
        trim: true,
        default: null
    },
    backgroundColor: {
        type: String,
        trim: true,
        default: null
    },
    textColor: {
        type: String,
        trim: true,
        default: null
    },
    buttonColor: {
        type: String,
        trim: true,
        default: null
    },
    buttonTextColor: {
        type: String,
        trim: true,
        default: null
    },
    iconColor: {
        type: String,
        trim: true,
        default: null
    },
    isApplied: {
        type: Boolean,
        trim: true,
        default: null
    },
    status: {
        type: String,
        trim: true,
        enum: {
            values: themeConst.themeStatusList,
            message: themeConst.invalidthemeStatusListMsg
        },
        set: value => value.toUpperCase()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        default: null
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        default: null
    },
    deletedAt: Date
},
{ timestamps: true, versionKey: false ,timestamps: true }
)

module.exports = mongoose.model('Theme',themeSchema)