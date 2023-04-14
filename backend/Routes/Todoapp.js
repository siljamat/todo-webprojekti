// Import the Express library
const express = require("express")

// Create a new router instance
const router = express.Router();

// Define the routes and their associated controller functions
router.post("/", require("./../Controllers/Todoapp").AddTodolist);   // POST request to create a new todo list
router.get("/", require("./../Controllers/Todoapp").getAllTodolist); // GET request to retrieve all todo lists
router.get("/:userId", require("./../Controllers/Todoapp").getTodolist); // GET request to retrieve a specific todo list by ID
router.delete("/:userId", require("./../Controllers/Todoapp").delTodolist); // DELETE request to delete a specific todo list by ID
router.put("/:userId", require("./../Controllers/Todoapp").updateTodolist); // PUT request to update a specific todo list by ID

// Export the router so that it can be used by other modules
module.exports = router;
