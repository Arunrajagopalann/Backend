
const orderModel = require('../models/order/order.model');
const categoryConst = require('../utils/category.utils');
const productModel = require("../models/product/product.model")
const warehouseModel = require("../models/warehouse/warehouse.model")
const customerModel = require("../models/masters/theme/customer.model")
const { parseString } = require('xml2js');
const mongoose = require('mongoose');


exports.createOrUpdateOrder = async (req, res) => {
    let id = req.params.id;
    const { orderId, orderName, orderItems, customer, shippingAddress } = req.body;
    const data = {
        orderId: orderId,
        orderName: orderName,
        orderItems: orderItems,
        customer: customer,
        shippingAddress: shippingAddress
    }
    console.log('data', data);
    try {
        if (id) {
            const category = await orderModel.findByIdAndUpdate(id, data)
            return { success: true, statusCode: 200, message: "order update successfully" };
        } else {
            try {
                data.status = categoryConst.categoryStatusActive;
                let totalAmount = 0;

                const findCustomer = await customerModel.find({ _id: data.customer })
                if (!findCustomer) {
                    return { success: false, statusCode: 400, message: `Could not find this customer` }
                }
                const items = data.orderItems;

                for (const item of items) {
                    const findProduct = await productModel.find({ _id: item.productId });
                    if (!findProduct) {
                        return { success: false, statusCode: 400, message: `Could not find this product ${item.productId}` }
                    }
                    if (findProduct) {
                        const findWarehouse = await warehouseModel.find({ _id: findProduct[0].warehouse })
                        if (!findWarehouse) {
                            return { success: false, statusCode: 400, message: `Could not find this warehouse ${findProduct[0].warehouse}` }
                        }

                        if (findWarehouse[0].stock >= item.quantity) {
                            totalAmount = totalAmount + findProduct[0].price * item.quantity
                            data.totalAmount = totalAmount;
                            const updatedStock = Number(findWarehouse[0].stock - item.quantity);
                            await warehouseModel.findByIdAndUpdate(findWarehouse[0]._id, { stock: updatedStock });
                            const order = new orderModel(data)
                            order.save()
                        } else {
                            return { success: false, statusCode: 400, message: `could not have stock in warehouse` }
                        }
                    }
                }
                return { success: true, statusCode: 200, message: " create order successfully" }
            }
            catch (err) {
                return { success: false, statusCode: 500, message: "Could not order Category" + err }
            }
        }
    }
    catch (err) {
        return { success: false, statusCode: 500, message: "Could not order Category" }
    }
}


exports.getAllOrder = async (req, res) => {
    let id = req.params.id;
    try {
        let aggregateOptions = [

                    { $lookup: { from: 'customers', localField: "customer", foreignField: '_id', as: 'Customers' }  },

                    { $unwind: { path: '$Customers', preserveNullAndEmptyArrays: true} },

                    { $unwind: '$orderItems' },

                    { $lookup: { from: 'products', localField: "orderItems.productId", foreignField: '_id', as: 'Products' } },

                    { $unwind: { path: '$Products', preserveNullAndEmptyArrays: true} },

                    { $lookup: { from: 'brands', localField: "Products.brand", foreignField: '_id', as: 'Brands' } },

                    { $unwind: { path: '$Brands',preserveNullAndEmptyArrays: true}  },

                    { $lookup: { from: 'categories', localField: "Products.category", foreignField: '_id', as: 'Categories'} },

                    { $unwind: {  path: '$Categories',  preserveNullAndEmptyArrays: true } },

                    { $lookup: {  from: 'warehouses', localField: "Products.warehouse", foreignField: '_id', as: 'Warehouse' } },

                    { $unwind: { path: '$Warehouse',  preserveNullAndEmptyArrays: true } },

                    { $group:
                        { _id: '$_id', orderId: { $first: '$orderId' }, orderName: { $first: '$orderName' }, customer: { $first: '$Customers.customerName' },
                            totalAmount: { $first: '$totalAmount' }, shippingAddress: { $first: '$shippingAddress' }, status: { $first: '$status' },
                            orderItems: {
                                $push: {
                                        quantity: '$orderItems.quantity', _id: '$Products._id', name: '$Products.name', price: '$Products.price',
                                        brand: { _id:'$Brands._id', brandName: '$Brands.brandName', status: '$Brands.status', },
                                        description :  '$Products.description' ,
                                        category : { _id: "$Categories._id", categoryName: "$Categories.categoryName", }, 
                                        warehouse :   { _id: "$Warehouse._id", warehouseName: "$Warehouse.warehouseName", 
                                        warehouseName: "$Warehouse.warehouseName", warehouseType:"$Warehouse.warehouseType", address: "$Warehouse.address", poc:"$Warehouse.poc", stock: "$Warehouse.stock", }, 
                                        seller :  '$Products.seller' ,
                                        images : '$Products.images',
                                        status :  '$Products.status',
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            orderId: 1,
                            orderName: 1,
                            customer: 1,
                            totalAmount: 1,
                            shippingAddress: 1,
                            status: 1,
                            orderItems: 1
                        }
                    }
        ];

        if (id) {
            aggregateOptions.unshift({$match: { orderId: id }});
            const order = await orderModel.aggregate(aggregateOptions)            
            return { data: order, success: true, statusCode: 200, message: "data fetched successfully" };
        } else {
            const orders = await orderModel.aggregate(aggregateOptions)
            console.log('orders',orders);
            return { data: orders, success: true, statusCode: 200, message: "data fetched successfully" };
        }
    }
    catch (err) {
        return { success: false, statusCode: 500, message: "Could not fetch order" + err }
    }
}



exports.deleteOrder = (req, res) => {
    const id = req.body.id
    try {
        if (id) {
            const order = orderModel.deleteById({ id: id })
            order.save()
            return { successs: true, statusCode: 200, message: "data deleted successfully" }
        }
    }
    catch (err) {
        return { success: false, statusCode: 500, message: "Could not fetch Category" + err }
    }
}


exports.orderXml = (req, res) => {
    const xml = req.body;

    if (typeof xml !== 'string') {
        return res.status(400).json({
            success: false,
            message: "Invalid XML format. Expected a string."
        });
    }

    try {
        parseString(xml, { explicitArray: false }, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: "Could not parse XML: " + err.message
                });
            }
            return { successs: true, data: result, statusCode: 200, message: "Data XML successfully parsed" }
        });
    } catch (error) {
        console.error('Error parsing XML:', error);
        return { success: false, statusCode: 500, message: "Could not parse XML:" + error }
    }
};



