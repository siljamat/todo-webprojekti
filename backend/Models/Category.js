/**
 Mongoose schema for defining the category model and its properties.
 @typedef {Object} CateSchema
 @property {string} cateName - The name of the category.
 @property {string} cateColor - The color associated with the category.
 */
const mongoose = require("mongoose")

/**
 Mongoose model for the category schema.
 @type {import("mongoose").Schema}
 */
// create Schema(format) for database//
const cateSchema = new mongoose.Schema({
    cateName:String,
    cateColor:String

})
module.exports = mongoose.model("category", cateSchema);
