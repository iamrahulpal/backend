const Category = require("../../models/categoryModel");

class createCategory {
  process = async (req, res) => {
    try {
      const { category } = req.body;

      const post = await Category.create({ name: category });
      res.status(201).json({
        type: "Success",
        data: "Category created successfully.",
      });
    } catch (error) {
      res.status(400).json({
        type: "Error",
        error: error.error || error,
      });
    }
  };
}

module.exports = new createCategory();
