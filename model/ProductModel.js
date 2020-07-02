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



// ProductModel.create({
//     productName : 'Đậu hà lan',
//     price       : 4000,
//     quality     : 12,
//     image       : 'http://rausachdatxanh.com/san-pham/khoai-lang.html'
// }).then(data => {
//     console.log(data)
// })

// ProductModel.find({}).then(data => console.log(data))
module.exports = ProductModel;





