/**
 Mongoose schema for defining the Todoapp model and its properties.
 @typedef {Object} TodoSchema
 @property {string} taskName - The name of the task.
 @property {Date} date - The date when the task is due.
 @property {string} category - The category of the task.
 */
const mongoose = require("mongoose")

/**
 * Creates a new schema for the Todoapp model.
 * @type {import("mongoose").Schema}
 */
// create Schema(format) for database//
const todoSchema = new mongoose.Schema({
    taskName:String,
    date:Date,
    category:String,

})
module.exports = mongoose.model("todolist", todoSchema);
