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

// const CategorySchema = new Schema({
//     categoryName : {
//         type : String,
//         require : true
//     },
//     product : {
//         type : mongoose.Schema.Types.ObjectId,
//         //kiểu như nó tham chiếu đến bảng nào
//         ref  : 'product'
//     }
// }, {
//     collection : 'category'
// })


// const CategoryModel = mongoose.model('category', CategorySchema);



// CategoryModel.find({
//     categoryName : 'Dưa'
// })
// .populate('product')
// .then(data => {
//     console.log(data);
// })


