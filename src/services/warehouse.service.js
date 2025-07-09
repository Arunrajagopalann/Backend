const warehouseModel = require('../models/warehouse/warehouse.model')
const productUtils = require('../utils/product/product.util')
exports.createOrUpdateWarehouse = async (req, res) => {
    const id = req.params.id;
    const { warehouseName, warehouseType, address, poc,stock } = req.body

    console.log("req+.body",req.body);
    
    try {
        const data = {
            warehouseName,
            warehouseType,
            address,
            poc,
            stock
        }
        if (id) {
            try {
                await warehouseModel.findByIdAndUpdate(id, data);
                return { success: true, statusCode: 200, message: " updated warehouse successfully" }
            } catch (error) {
                return { success: false, statusCode: 400, message: "Could not create warehouse" + error }
            }

        } else {
            try {
                const warehouse = new warehouseModel(data)
                warehouse.save()
                return { success: true, statusCode: 200, message: " created warehouse successfully" }
            } catch (error) {
                return { success: false, statusCode: 400, message: "Could not create warehouse" + error }
            }
        }
    } catch (error) {
        return { success: false, statusCode: 500, message: "Internal Server error" + error }
    }
}
exports.getWarehouse = async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            try {
                const query = { _id: id, status: { $ne: 'DELETED' } }
                const findWarehouse = await warehouseModel.find(query)
                if (findWarehouse) {
                    return { data: findWarehouse, success: true, statusCode: 200, message: " fetched warehouse successfully" }
                }
            } catch (error) {
                return { success: false, statusCode: 400, message: "Could not get warehouse" + error }
            }
        } else {
            try {
                console.log('warehouseModel',warehouseModel());
                
                const findWarehouse = await warehouseModel.find({ status: { $ne: 'DELETED' }})
                if (findWarehouse) {
                    return { data: findWarehouse, success: true, statusCode: 200, message: "fetched warehouse successfully" }
                }
            } catch (error) {
                return { success: false, statusCode: 400, message: "Could not get warehouse" + error }
            }
        }
    } catch (error) {
        return { success: false, statusCode: 500, message: "Internal Server error" + error }
    }
}

exports.deleteWarehouse = async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const warehouse = await warehouseModel.findById(id)
            warehouse.status= productUtils.productStatusDeleted
            warehouse.save()
            return { success: true, statusCode: 200, message: " delete warehouse successfully" }
        } else {
            return { success: false, statusCode: 400, message: "Could not delete warehouser" + error }
        }
    } catch (error) {
        return { success: false, statusCode: 500, message: "Internal Server error" + error }
    }
}

exports.statusUpdateWarehouse = async (req, res) => {
    const id = req.params.id;
    const status = req.params.id;
    try {
        if (id) {
            const warehouse = await warehouseModel.findById(id)
            warehouse.status= status;
            warehouse.save()
            return { success: true, statusCode: 200, message: "status updated warehouse successfully" }
        } else {
            return { success: false, statusCode: 400, message: "Could not status update warehouser" }
        }
    } catch (error) {
        return { success: false, statusCode: 500, message: "Internal Server error" + error }
    }
}

