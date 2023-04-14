const express = require("express");

// Create an instance of an Express router using the `express.Router()` method.
const router = express.Router();

// Import category controller functions
const {
    AddCategory,
    getAllCategory,
    getCategory,
    delCategory,
    updateCategory
} = require("./../Controllers/Category");

// Define HTTP POST method to create a new category
router.post("/", AddCategory);

// Define HTTP GET method to retrieve all categories
router.get("/", getAllCategory);

// Define HTTP GET method to retrieve a single category by its ID
router.get("/:userId", getCategory);

// Define HTTP DELETE method to delete a category by its ID
router.delete("/:userId", delCategory);

// Define HTTP PUT method to update a category by its ID
router.put("/:userId", updateCategory);

// Export the router module
module.exports = router;
