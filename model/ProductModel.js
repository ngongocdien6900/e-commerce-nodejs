const mongoose = require('../config/connectDB');
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
    image : {
        type : String,
        default : 'Hình ảnh'
    }
}, {
    collection : 'product'
})

const ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel;





