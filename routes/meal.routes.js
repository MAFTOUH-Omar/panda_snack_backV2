const express = require("express");
const router = express.Router();
const {
  createMeal,
  getAllMeals,
  getMealById,
  updateMealById,
  deleteMealById,
  getMealsByCategory
} = require("../controllers/meal.controller");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Picture/meal_picture/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Route pour créer un nouveau repas
router.post("/meals", upload.single("Mealpicture"),createMeal);

// Route pour obtenir tous les repas
router.get("/meals", getAllMeals);

// Route pour obtenir un repas par son ID
router.get("/meals/:id", getMealById);

// Route pour mettre à jour un repas par son ID
router.put("/meals/:id", updateMealById);

// Route pour supprimer un repas par son ID
router.delete("/meals/:id", deleteMealById);
router.get("/mealsbycat/:categoryId", getMealsByCategory);

module.exports = router;
