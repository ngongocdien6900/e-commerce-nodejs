const productModel = require('../model/ProductModel');
const categoryModel = require('../model/CategoryModel');
module.exports = {
    getSanPham: async (req, res, next) => {
        //số sản phẩm 1 trang
        const PAGE_SIZE = 8;

        //nếu có tìm kiếm
        if (req.query.search) {
            let product = await productModel.find({
                productName: new RegExp(req.query.search)
            })
            let totalPage = await Math.ceil(product / PAGE_SIZE);
            let category = await categoryModel.find();
            res.render('sanpham', {
                product, totalPage, category
            })
        } else {
            try {
                // lấy page truyền trên thanh địa chỉ
                let page = req.query.page;
                //nếu có page truyền lên thì lấy giá trị đó. K có thì mặc định là 1
                page ? page : page = 1
                let skip = (page - 1) * PAGE_SIZE;
                let product = await productModel.find({}) 
                .skip(skip)
                .limit(PAGE_SIZE)
                //lấy tổng số sản phẩm rồi chia ra để tính xem có bao nhiêu trang
                let totalPage = await productModel.countDocuments({})
                totalPage = Math.ceil(totalPage / PAGE_SIZE)
                let category = await categoryModel.find();
                res.render('sanpham', {
                    product, category, totalPage
                })
            }catch(err ) {
                res.json(err)
            }
            
        }
        
    },
    getDetailProduct: async (req, res) => {
        let product = await productModel.findOne({
            _id: req.params.id
        })
        let randomProduct = await  productModel.aggregate(
            [{ $sample: { size: 4 } }]
        )      
        res.render('product-detail', { product, randomProduct })
    },
    getProductByCategory : async (req, res) => {
        productModel.find()
        .populate('categories')
        .exec((err, product) => {
            if(err) throw err
            if(product)
                categoryModel.findOne({
                _id : req.params.idCategory
                }).then(category => {
                    res.render('productByCategory', {product, category})
                })
        })
    }
    
}

// <% for(let i = 0; i < category.length; i++) { %>
//     <li><a href="/sanpham/danhmuc/<%- cha._id %>"><%-category[i].categoryName %></a></li>
//     <% }) %>

// <% for(let i = 0; i < product.length; i++) {%>
//     <% if(category._id.toString() == product[i].categories._id.toString()){ %>  <br> 
//             đúng
//     <%}else {%>
//             sai
//         <% } %>
// <% } %>
