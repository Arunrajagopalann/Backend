const mongoose = require('mongoose');
const productConst = require('../../utils/product/product.util')

const warehouseSchema = mongoose.Schema(
    {
        warehouseName:{
            type:String,
            default: null,
        },
        warehouseType:{
            type:String,
            default: null,
        },
        address:[
            {
                addressType:{type:String,},
                addressLine1:{type:String,},
                addressLine2:{type:String,},
                country:{type:String,},
                state:{type:String,},
                city:{type:String,},
                postalCode:{type:String,},
            }
        ],
        poc:{
            type:String,
            default: null,
        },
        stock:{
            type: Number,
            //  required: true
            },
        status:{
            type:String,
            value: productConst.productStatusList,
            set : value => value.toUpperCase()

        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            default: null,
            trim: true,
            ref: 'Warehouse',
        },
        updatedBy:{
            type:mongoose.Schema.Types.ObjectId,
            default: null,
            trim: true,
            ref: 'Warehouse',
        }

    },{ versionKey: false,timestamps: true }
)

module.exports = mongoose.model('Warehouse',warehouseSchema)