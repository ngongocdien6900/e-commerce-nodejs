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

const ProductModel = mongoose.model('product', ProductSchema);
const CategoryModel = mongoose.model('category', CategorySchema);


// CategoryModel.create({
//     categoryName : 'Bí',
//     product  : '5efb5ef3d601b11d743e8dec'
// })
// .then(data => {
//     console.log(data)
// })

CategoryModel.find()
.populate('product')
.then(data => {
    console.log(data);
})