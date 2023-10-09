const mongoose = require("mongoose");
var categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"name not provided"]
    },
    description : {
        type : String,
        required : false
    },
    categoryPicture : {
        type : String , 
        required : false
    },
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("category", categorySchema);