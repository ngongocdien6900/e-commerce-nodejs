const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser: true, useUnifiedTopology: true}, 
(err) => {
    // nếu kết nối lỗi thì xuất thông báo
    if(err){
        console.log("Error : " + err);
    }
    // kết nối thành công
    else {
        console.log("Connected successfully");
    }
});

module.exports = mongoose;
