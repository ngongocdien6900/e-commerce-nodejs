const mongoose = require('../config/connectDB');
const Schema = mongoose.Schema;
const ProductModel = require('./ProductModel');

const CategorySchema = new Schema({
    categoryName : {
        type : String,
        require : true
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        //kiểu như nó tham chiếu đến bảng nào
        ref  : 'product'
    }
}, {
    collection : 'category'
})

const CategoryModel = mongoose.model('category', CategorySchema);

CategoryModel.find({
    categoryName : 'Dưa'
})
.populate('product')
.then(data => {
    console.log(data);
})

module.exports = CategoryModel;