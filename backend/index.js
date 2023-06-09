/**
 Express server for managing Todo and Category apps.
 @module server
 */
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

/**
 Handle connected event on the database connection.
 @event connected
 @param {Error} err - The error object, if any.
 @returns {void}
 */
// Listen for the "connected" event on the database connection
conn.connection.on("connected", (err) => {
    if(err){
        console.error(err);
    }else{
        console.log("connected  To MongoDB");
    }
})

/**
 Start the server and listen on the specified port.
 @function
 @param {number} port - The port number to listen on.
 @returns {void}
 */
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log("server is started");
})
