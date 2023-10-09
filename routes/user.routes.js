const express = require('express')
const route = express.Router()
const { subscribe, loginUser , getAllDelivery } = require("../controllers/user.controller");
// const multer = require("multer");
// const upload = multer({
//     dest : "user_profile/",
// });

// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "Picture/user_profile/"); 
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + ext); 
//   },
// });

// const upload = multer({ storage });

route.post("/subscribe", subscribe);
route.post("/login", loginUser);
route.get('/delivery', getAllDelivery);
module.exports = route;