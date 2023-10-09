const mongoose = require("mongoose");
const category=require("./category.model")
var mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name not provided "],
    },
    description: {
        type: String,
        required: [true, "description not provided"]
    },
    categoryId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"category" 
    },
    Mealpicture: {
        type:String,
        required : [true , "Meal picture not provided"]
    },
    price : {
        type : String,
        required : [true , "Price not provided"]
    },
    riting: {
        type : Number,
        default : 3,
        required: false
    },
    tags : {
        type : [String],
        required : false
    },
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("meal", mealSchema);