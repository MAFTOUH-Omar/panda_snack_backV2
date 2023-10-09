const Meal = require("../models/meal.model");
const category = require('../models/category.model')
// Créer un nouveau repas
const createMeal = async (req, res) => {
  try {
    const { name, description, categoryId ,  price ,  riting, tags } = req.body;
    const Mealpicture = req.file ? req.file.filename : "" ;
    const newMeal = new Meal({
      name,
      description,
      categoryId,
      Mealpicture : `Picture/meal_picture/${Mealpicture}`,
      price,
      riting,
      tags,
    });

    await newMeal.save();

    res.status(201).json({ message: "Meal created successfully", meal: newMeal });
  } catch (error) {
    res.status(500).json({ error: "Meal creation failed" });
  }
};

// Obtenir tous les repas
const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find().populate('categoryId');
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: "Error fetching meals" });
  }
};

// Obtenir un repas par son ID
const getMealById = async (req, res) => {
  const mealId = req.params.id;

  try {
    const meal = await Meal.findById(mealId).populate('categoryId');
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    // Split the Mealpicture URL and get the last segment as the filename
    const mealPictureSegments = meal.Mealpicture.split('/');
    const mealPictureFilename = mealPictureSegments[mealPictureSegments.length - 1];

    // Replace the original Mealpicture field with just the filename
    meal.Mealpicture = mealPictureFilename;

    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: "Error fetching meal" });
  }
};


// Mettre à jour un repas par son ID
const updateMealById = async (req, res) => {
  const mealId = req.params.id;
  const { name, description, categoryId,price, riting, tags } = req.body;
  const Mealpicture = req.file ? req.file.filename : "" ;
  try {
    const meal = await Meal.findByIdAndUpdate(
      mealId,
      { name, description, categoryId, price , Mealpicture : `Picture/meal_picture/${Mealpicture}` , riting, tags },
      { new: true }
    );

    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.status(200).json({ message: "Meal updated successfully", meal });
  } catch (error) {
    res.status(500).json({ error: "Error updating meal" });
  }
};

// Supprimer un repas par son ID
const deleteMealById = async (req, res) => {
  const mealId = req.params.id;

  try {
    const meal = await Meal.findByIdAndRemove(mealId);

    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.status(200).json({ message: "Meal deleted successfully", meal });
  } catch (error) {
    res.status(500).json({ error: "Error deleting meal" });
  }
};

const getMealsByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const meals = await Meal.find({ categoryId }).exec();

    if (!meals) {
      return res.status(404).json({ message: 'Meals not found for the specified category.' });
    }

    // Modifier le champ Mealpicture pour extraire uniquement le nom du fichier
    const modifiedMeals = meals.map((meal) => {
      const mealPictureUrl = meal.Mealpicture;
      const fileName = mealPictureUrl.substring(mealPictureUrl.lastIndexOf('/') + 1);
      return { ...meal.toObject(), Mealpicture: fileName };
    });

    res.status(200).json({ meals: modifiedMeals });
  } catch (error) {
    console.error('Error fetching meals by category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMealById,
  deleteMealById,
  getMealsByCategory
};
