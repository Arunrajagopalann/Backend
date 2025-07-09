const mongoose = require('mongoose');
const categoryConst = require('../../../utils/category.utils')
const customerSchema = mongoose.Schema({
   customerName:{
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
        ref:'Customer',
        default:null,
        trim : true
    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        default:null,
        trim : true
    }

},{versionKey:false,timestamps: true})

customerSchema.methods.sayHi = function(){
    console.log(` ${this.brandName} this is the brand`)

}
customerSchema.statics.findByName = function(name){
   
    return this.where({brandName:new RegExp(name,"i") })

}
customerSchema.virtual.findByName = function(name){
   
    return this.where({brandName:new RegExp(name,"i") })

}
customerSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next();
});
customerSchema.post('save', function(docs,next) {
    docs.sayHi();
    next();
});

module.exports = mongoose.model('Customer',customerSchema)