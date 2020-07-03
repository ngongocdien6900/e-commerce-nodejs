const mongoose = require('../config/connectDB');
const Schema = mongoose.Schema;
const ProductModel = require('./ProductModel');

const CategorySchema = new Schema({
    categoryName : {
        type : String,
        require : true
    },
    products : [{
        //id là id của thằng con nó
        type : mongoose.Schema.Types.ObjectId,
        //kiểu như nó tham chiếu đến bảng nào
        ref  : 'product'
    }]
}, {
    collection : 'category'
})

const CategoryModel = mongoose.model('category', CategorySchema);



module.exports = CategoryModel;

