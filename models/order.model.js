const mongoose = require("mongoose");
const meal=require("./meal.model")
const user=require("./user.model")
var orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name not provided "],
    },
    email: {
        type: String,
        required: [true, "email not provided"],
        validate: {
            validator: function (v) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    phone : {
        type : String,
        required : [true , "phone not provided"],
    },
    adress:{
        type:String,
        required:true,
    },
    meal : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"meal" 
    },
    userId: { 
        type : String,
        required : [true , "userId not provided"]
    },
    quantity: {
        type : Number,
        required : [true , "Meal picture not provided"]
    },
    status: {
        type: String,
        enum: ['processing', 'shipped', 'delivered'],
        default: 'processing'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("order", orderSchema);