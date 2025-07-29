const productModel = require('../models/product/product.model')
const categoryModal = require('../models/category/category.model')
const productConst = require('../utils/product/product.util')
const logger = require('../utils/log/logger');
const categoryModel = require('../models/category/category.model');
const XLSX = require('xlsx')
const path = require('path');


exports.downloadProduct = async (req, res) => {
    let page = 1;
    let limit = 10;
    const skip = (page - 1) * limit;
    let search = '';
    try {
        const products = await getProductAggregate(search, limit, skip)

        const excelBuffer = generateExcelReport(products);
        res.setHeader('Content-Disposition', 'attachment; filename=products_report.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('message', 'downloadProduct successfully');
        res.setHeader('statusCode', '200');
        res.send(excelBuffer);
    } catch (error) {
        res.status(500).json({ success: false, message: "Could not download products: " + error.message });
    }
}


function generateExcelReport(data) {
    const workbook = XLSX.utils.book_new();
    const formattedData = data.map(item => ({
        ID: String(item._id),
        Name: item.name,
        Price: item.price,
        Description: item.description,
        Seller: item.seller,
        Images: item.images.join(", "),
        Status: item.status,
        TotalStock: item.totalStock,
        Brand: item.brand,
        Category: item.category
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    return excelBuffer;
}
exports.getProducts = async (req, res) => {

    const id = req.params.id;
    let page = 1;
    let limit = 10;
    const skip = (page - 1) * limit;
    let search = '';
    if (req.query.page) {
        page = req.query.page;
    }

    if (req.query.limit) {
        limit = parseInt(req.query.limit);
    }
    if (req.query.search) {
        search = req.query.search;
    }

    try {
        if (id) {
            const findProduct = await productModel.aggregate([
                { $match: { _id: id } }
            ]);
         
            return ({
                data: findProduct,
                total: totalDocs,
                totalPages: totalPages,
                currentPage: page,
                perPage: limit,
                success: true,
                statusCode: 200,
                message: 'Products fetched successfully',
            });
        } else {
            const products = await getProductAggregate(search, limit, skip)
            const totalDocs = await productModel.countDocuments();
            const totalPages = Math.ceil(totalDocs / limit);

            return ({
                data: products,
                total: totalDocs,
                totalPages: totalPages,
                currentPage: page,
                perPage: limit,
                success: true,
                statusCode: 200,
                message: 'Products fetched successfully',
            });
        }
    }
    catch (err) {
        logger.error(`Exception occured during login: ${err.stack}`);
        return { success: false, statusCode: 500, message: "Could not fetch product " + err };
    }
}

const getProductAggregate = async (search, limit, skip) => {
    const aggregateOptions = [
        {
            $lookup: {
                from: 'brands',
                localField: 'brand',
                foreignField: '_id',
                as: 'brands'
            },
        },
        {
            $unwind: {
                path: '$brands',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'categories'
            },
        },
        {
            $unwind: {
                path: '$categories',
                preserveNullAndEmptyArrays: true
            }
        },

        {
            $match: {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { status: { $regex: search, $options: 'i' } },
                    { seller: { $regex: search, $options: 'i' } },
                    { price: Number(search) },
                    { 'brands.brandName': { $regex: search, $options: 'i' } }
                ]
            }
        },
        {
            $group: {
                _id: '_id',
                totalStock: { $sum: '$stock' },
                products: { $push: '$$ROOT' }
            }
        },
        {
            $unwind: '$products'
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        '$products',
                        { totalStock: '$totalStock' }
                    ]
                }
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                brand: '$brands.brandName',
                category: '$categories.categoryName',
                price: 1,
                description: 1,
                seller: 1,
                images: 1,
                status: 1,
                totalStock: 1,
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        }
    ]

    const products = await productModel.aggregate(aggregateOptions);
    return products;
}

exports.getByIdProducts = async (req, res) => {
    let id = req.params.id;
    try {
        const products = await productModel.findById(id)
        const populate = await productModel.findById(id).populate('brand')

        if (!products) {
            return { statusCode: 404, message: 'Product not found' };
        }
        return { statusCode: 200, message: 'Product fetched successfully', data: products };
    }
    catch (err) {
        return { success: false, statusCode: 500, message: "Could not Product fetched"+err };
    }
}

exports.createOrUpdateProduct = async (req, res) => {
    let data = req.body;
    const files = req.files;
    let id = req.params.id;
    let productData = {
        "name": data.name,
        "brand": data.brand,
        "description": data.description,
        "category": data.category,
        "price": data.price,
        "seller": data.seller,
        "warehouse": data.warehouse,
        "images": data.images,
    }
    if (files) {
        productData.images = files.map(file => file.path);
    }
    try {
        if (id) {
            await productModel.findByIdAndUpdate(id, data);
            return { success: true, statusCode: 200, message: "Products update successfully" };
        } else {
            try {
                const findCategory = await categoryModel.find({ _id: productData.category })
                if (!findCategory) {
                    return { success: false, statusCode: 400, message: "did not find cateory" };
                }
                if (productData.category < 0) {
                    return { success: false, statusCode: 400, message: "price did  not below 0" };
                }
                productData.status = productConst.productStatusActive;
                let createProduct = new productModel(productData)
                await createProduct.save();
                return { success: true, statusCode: 200, message: "Products create successfully" };
            }
            catch (err) {
                if (err.code == 11000) {
                    return { success: false, statusCode: 500, message: "duplicate product name " + Object.values(err.keyValue)[0] };
                }
                return { success: false, statusCode: 500, message: "Could notcreate productr" + err };
            }
        }
    }
    catch (err) {
        console.log(err)
        return { success: false, statusCode: 500, message: "Could not create productr" };
    }
}

exports.deleteProduct = async (req, res) => {
    let id = req.params.id;
    try {
        await productModel.findByIdAndDelete(id)
        return { success: true, statusCode: 200, message: "Products delete successfully" };
    }
    catch (err) {
        return { success: false, statusCode: 500, message: "Could not delete producr" };
    }
}

exports.patchProduct = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status;
    try {
        if (status) {
            let product = await productModel.findById(id);
            product.status = status
            product.save()
            return { success: true, statusCode: 200, message: "Products status updated successfully" };
        } else {
            return { success: false, statusCode: 400, message: "status is required" };
        }
    }
    catch {
        return { success: false, statusCode: 500, message: "Could not status updated" };
    }
}

exports.downloadimage = async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.resolve(__dirname, '../../uploads', filename);
    res.download(filePath, (err) => {
        if (err) {
            console.log('Error in downloading file:', err);
            res.status(404).send('File not found');
        }
    });
}

exports.bulkUploadProducts = async (req, res) => {
    if (!req.file) {
        return { success: false, statusCode: 400, message: "No file uploaded" };
    }
    try {
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        if (workbook.Sheets[sheetName]) {
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            const productsToInsert = [];
            for (let data of sheetData) {
                const {ID, Name, Brand, Description, Category, Price, Seller, Warehouse, Images } = data;
                let productData = {
                    name: Name,
                    brand: Brand,
                    description: Description,
                    category: Category,
                    price: Price,
                    seller: Seller,
                    warehouse: Warehouse,
                    images: Images ? Images.split(',') : []
                };
                const idExists = await productModel.exists({ _id: productData.id });
                if (idExists) {
                    return { success: false, statusCode: 400, message: `Product ID already exists: ${ID}` };
                }
                const categoryExists = await categoryModel.exists({ _id: productData.category });
                
                if (!categoryExists) {
                    return { success: false, statusCode: 400, message: `Invalid category for product: ${Name}` };
                }

                if (productData.price < 0) {
                    return { success: false, statusCode: 400, message: `Invalid price for product: ${Name}` };
                }
                productData.status = 'ACTIVE';
                productsToInsert.push(productData);
            }
            if (productsToInsert.length > 0) {
                await productModel.insertMany(productsToInsert);
                return { success: true, statusCode: 200, message: "Products status updated successfully" };
            } else {
                return { success: false, statusCode: 400, message: `No valid products to upload` };
            }
        } else {
            console.error("Sheet not found");
        }
    } catch (error) {
        return { success: false, statusCode: 500, message: "Internal server error " + error };
    }
}

