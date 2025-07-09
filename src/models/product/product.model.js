
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productConst = require('../../utils/product/product.util')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    trim: true,
    ref: 'Brand',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  warehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true
  },

  seller: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    value: productConst.productStatusList,
    set: value => value.toUpperCase()
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    trim: true,
    ref: 'Product',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    trim: true,
    ref: 'Product'
  }
}, { versionKey: false, timestamps: true })

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema)