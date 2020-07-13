const mongoose = require('../config/connectDB');
const CategoryModel = require('./CategoryModel');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName : {
        type :String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    quality : {
        type : Number,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    image : {
        type : String,
        default : 'Hình ảnh'
    },
    categories : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'category'
    }
    
}, {
    collection : 'product'
})

const ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel;





