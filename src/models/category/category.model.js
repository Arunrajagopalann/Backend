const mongoose = require('mongoose');
const categoryConst = require('../../utils/category.utils')

const categorySchema = mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        unique: true 
    },
    status:{
        type:String,
        value:categoryConst.categoryStatusList,
        set: value=>value.toUpperCase()
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'category',
        default:null,
        trim : true
    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'category',
        default:null,
        trim : true
    }

},{versionKey:false,timestamps: true})

categorySchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

categorySchema.pre('updateMany', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

module.exports = mongoose.model('Category',categorySchema)