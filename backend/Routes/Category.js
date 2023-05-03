/**
 Express router for managing categories.
 @module routes/Category
 @type {object}
 @const
 */
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

/**
 HTTP POST method to create a new category.
 @function
 @name AddCategory
 @param {string} path - Express path.
 @param {callback} middleware - Express middleware.
 */
// Define HTTP POST method to create a new category
router.post("/", AddCategory);

/**
 HTTP GET method to retrieve all categories.
 @function
 @name getAllCategory
 @param {string} path - Express path.
 @param {callback} middleware - Express middleware.
 */
// Define HTTP GET method to retrieve all categories
router.get("/", getAllCategory);

/**
 HTTP GET method to retrieve a single category by its ID.
 @function
 @name getCategory
 @param {string} path - Express path.
 @param {callback} middleware - Express middleware.
 */
// Define HTTP GET method to retrieve a single category by its ID
router.get("/:userId", getCategory);

/**
 HTTP DELETE method to delete a category by its ID.
 @function
 @name delCategory
 @param {string} path - Express path.
 @param {callback} middleware - Express middleware.
 */
// Define HTTP DELETE method to delete a category by its ID
router.delete("/:userId", delCategory);

/**
 HTTP PUT method to update a category by its ID.
 @function
 @name updateCategory
 @param {string} path - Express path.
 @param {callback} middleware - Express middleware.
 */
// Define HTTP PUT method to update a category by its ID
router.put("/:userId", updateCategory);

/**
 Module that exports the router instance.
 @type {object}
 @const
 @memberof module:routes/Category
 */
// Export the router module
module.exports = router;