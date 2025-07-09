const mongoose = require('mongoose');
const productConst = require('../../utils/product/product.util')

const orderSchema = mongoose.Schema(
    {
        orderId: {
            type: String,
        },
        orderName: {
            type: String,
        },
        orderItems: [{
            productId: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
            quantity: { type: Number, required: true  },
        }],
        totalAmount: { type: Number, required: true },
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
        shippingAddress: { type: String, required: true },
        status: {
            type: String,
            value: productConst.productStatusList,
            set: value => value.toUpperCase()
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            trim: true,
            ref: 'Order',
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            trim: true,
            ref: 'Order'
        }
    }, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Order', orderSchema)