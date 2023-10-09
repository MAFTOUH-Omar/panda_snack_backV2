const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "fullname not provided "],
  },
  email: {
    type: String,
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
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
    required : [true,"phone not provided"],    
  },
  role: {
    type:String,
    enum: ["User","Admin","Delevry"],
    required : [true , "role not provided"]
  },
  password: {
    type: String,
    required: true
  },
  picture : {
    type : String , 
    required : false
  },
  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("user", userSchema);