/**
 Express router for managing todo lists.
 @module routes/Todoapp
 @type {object}
 @const
 */
// Import the Express library
const express = require("express")
// Create a new router instance
const router = express.Router();

// Define the routes and their associated controller functions
/**
 HTTP POST method to create a new todo list.
 @function
 @name AddTodolist
 @param {function} AddTodolist - The controller function that creates a new todo list.
 */
router.post("/", require("./../Controllers/Todoapp").AddTodolist);   // POST request to create a new todo list
/**
 HTTP GET method to retrieve all todo lists.
 @function
 @name getAllTodolist
 @param {function} getAllTodolist - The controller function that retrieves all todo lists.
 */
router.get("/", require("./../Controllers/Todoapp").getAllTodolist); // GET request to retrieve all todo lists
/**
 HTTP GET method to retrieve a specific todo list by ID.
 @function
 @name getTodolist
 @param {function} getTodolist - The controller function that retrieves a specific todo list by ID.
 @param {string} userId - The ID of the todo list to retrieve.
 */
router.get("/:userId", require("./../Controllers/Todoapp").getTodolist); // GET request to retrieve a specific todo list by ID
/**
 HTTP DELETE method to delete a specific todo list by ID.
 @function
 @name delTodolist
 @param {function} delTodolist - The controller function that deletes a specific todo list by ID.
 @param {string} userId - The ID of the todo list to delete.
 */
router.delete("/:userId", require("./../Controllers/Todoapp").delTodolist); // DELETE request to delete a specific todo list by ID
/**
 HTTP PUT method to update a specific todo list by ID.
 @function
 @name updateTodolist
 @param {function} updateTodolist - The controller function that updates a specific todo list by ID.
 @param {string} userId - The ID of the todo list to update.
 */
router.put("/:userId", require("./../Controllers/Todoapp").updateTodolist); // PUT request to update a specific todo list by ID

/**
 Export the router so that it can be used by other modules.
 @type {object}
 */
// Export the router so that it can be used by other modules
module.exports = router;