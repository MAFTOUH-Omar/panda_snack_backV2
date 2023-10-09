const Category = require("../models/category.model");
const fs = require("fs");
// Créer une nouvelle catégorie
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryPicture = req.file ? req.file.filename : "" ;

    const newCategory = new Category({
      name,
      description,
      categoryPicture: `Picture/category_picture/${categoryPicture}`,
    });

    await newCategory.save();

    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ error: "Category creation failed" });
  }
};

// Obtenir toutes les catégories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
};

// Obtenir une catégorie par son ID
const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Error fetching category" });
  }
};

// Mettre à jour une catégorie par son ID
const updateCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  const { name, description } = req.body;
  const categoryPicture = req.file ? req.file.filename : "" ;

  try {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name, description, categoryPicture : `Picture/category_picture/${categoryPicture}` },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ error: "Error updating category" });
  }
};

// Supprimer une catégorie par son ID
const deleteCategoryById = async (req, res) => {
    const categoryId = req.params.id;

    try {
      const category = await Category.findByIdAndRemove(categoryId);
  
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(200).json({ message: "Category deleted successfully", category });
    } catch (error) {
      res.status(500).json({ error: "Error deleting category" });
    }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
