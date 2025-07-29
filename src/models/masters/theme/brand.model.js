const mongoose = require('mongoose');
const categoryConst = require('../../../utils/category.utils')
const brandSchema = mongoose.Schema({
    brandName:{
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
        ref:'brand',
        default:null,
        trim : true
    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'brand',
        default:null,
        trim : true
    }

},{versionKey:false,timestamps: true})

brandSchema.methods.sayHi = function(){

}
brandSchema.statics.findByName = function(name){
   
    return this.where({brandName:new RegExp(name,"i") })

}
brandSchema.virtual.findByName = function(name){
   
    return this.where({brandName:new RegExp(name,"i") })

}
brandSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next();
});
brandSchema.post('save', function(docs,next) {
    docs.sayHi();
    next();
});

module.exports = mongoose.model('Brand',brandSchema)