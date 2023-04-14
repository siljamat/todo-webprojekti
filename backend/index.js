// Require the express library
const express = require("express");

// Initialize the express application
const app = express();

// Require the database connection file
const conn =require("./db");

// Set the port number
const PORT = 2000;

// Require the CORS middleware
const cors = require("cors")

// Use the CORS middleware
app.use(cors())

// Use the JSON middleware to parse incoming requests
app.use(express.json());

// Define a route for the Todo app and use the Todoapp router
app.use("/todolist", require("./Routes/Todoapp"));

// Define a route for the Category app and use the Category router
app.use("/category", require("./Routes/Category"));

// Listen for the "connected" event on the database connection
conn.connection.on("connected", (err) => {
    if(err){
        console.error(err);
    }else{
        console.log("connected  To MongoDB");
    }
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log("server is started");
})

// Require the mongoose library and the database connection file
const mongoose = require('mongoose');
const db = require('./db');

// Define a schema for your todo items
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// Define a model for your todo items using the schema
const Todo = mongoose.model('Todo', todoSchema);

// Use the Todo model to interact with the database
Todo.find()
    .then((todos) => {
        console.log('All todos:', todos);
    })
    .catch((error) => {
        console.log('Error:', error);
    });
