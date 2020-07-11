const mongoose = require('../config/connectDB');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    categoryName : {
        type : String,
        require : true
    }
}, {
    collection : 'category'
})

const CategoryModel = mongoose.model('category', CategorySchema);



module.exports = CategoryModel;

