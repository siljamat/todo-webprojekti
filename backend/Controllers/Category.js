// Import necessary functions and model from files
const { find, findOneAndDelete } = require("../Models/Category");
const categoryModel = require("../Models/Category");

// Define function to add a new category to the database
exports.AddCategory = async (req, res) => {
    try {
        // Create a new instance of the "Category" model with the request body as data, and save it to the database
        const exp = await new categoryModel(req.body).save();
        // Send the saved data back to the client in the response
        res.json(exp);
    } catch (err) {
        // Handle any errors that occur during the asynchronous code execution, and send an error response back to the client
        res.json({ err });
    }
};

// Define function to get all categories from the database
exports.getAllCategory = async (req, res) => {
    try {
        // Retrieve all documents in the "Category" collection
        const exp = await categoryModel.find();
        // Send the retrieved data back to the client in the response
        res.json(exp);
    } catch (err) {
        // Handle any errors that occur during the asynchronous code execution, and send an error response back to the client
        res.json({ err });
    }
};

// Define function to get a specific category from the database based on the provided userId parameter
exports.getCategory = async (req, res) => {
    try {
        // Retrieve a specific document in the "Category" collection based on the provided userId parameter
        const exp = await categoryModel.find({ _id: req.params.userId });
        // Send the retrieved data back to the client in the response
        res.json(exp);
    } catch (err) {
        // Handle any errors that occur during the asynchronous code execution, and send an error response back to the client
        res.json({ err });
    }
};

// Define function to delete a specific category from the database based on the provided userId parameter
exports.delCategory = (req, res) => {
    // Use the findOneAndDelete() method with the _id field as the query parameter to delete a specific document in the "Category" collection
    categoryModel.findOneAndDelete({ _id: req.params.userId }, (err, data) => {
        if (err) {
            // Handle any errors that occur during the code execution, and send an error response back to the client
            res.json({ err });
        } else {
            // Send the deleted data back to the client in the response
            res.json(data);
        }
    });
};

// Define function to update a specific category in the database based on the provided userId parameter
exports.updateCategory = (req, res) => {
    // Use the findOneAndUpdate() method with the _id field as the query parameter and the request body as the new data to update a specific document in the "Category" collection
    categoryModel.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true },
        (err, data) => {
            if (err) {
                // Handle any errors that occur during the code execution, and send an error response back to the client
                res.json({ err });
            } else {
                // Send the updated data back to the client in the response
                res.json(data);
            }
        }
    );
};
