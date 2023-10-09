const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/category.controller");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Picture/category_picture/"); // Répertoire où les images seront stockées
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

router.post("/categories", upload.single("categoryPicture"),createCategory);

router.get("/categories", getAllCategories);

router.get("/categories/:id", getCategoryById);

router.put("/categories/:id", updateCategoryById);

router.delete("/categories/:id", deleteCategoryById);

module.exports = router;
