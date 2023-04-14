// Importing the `find` and `findOneAndDelete` methods from the Todoapp model file
const { find, findOneAndDelete } = require("../Models/Todoapp");

// Importing the Todoapp model file
const userModel = require("../Models/Todoapp");

// Controller function to add a new task to the list
exports.AddTodolist = async (req, res) => {
    try {
        // Creating a new task using the request body and saving it to the database
        const exp = await new userModel(req.body).save();
        // Sending the created task as a response
        res.json(exp);
    } catch (err) {
        // If an error occurs, sending the error as a response
        res.json({ err });
    }
};

// Controller function to get all the tasks from the list
exports.getAllTodolist = async (req, res) => {
    try {
        // Finding all the tasks from the database
        const exp = await userModel.find();
        // Sending the tasks as a response
        res.json(exp);
    } catch (err) {
        // If an error occurs, sending the error as a response
        res.json({ err });
    }
};

// Controller function to get a single task from the list
exports.getTodolist = async (req, res) => {
    try {
        // Finding a task with the given id from the database
        const exp = await userModel.find({ _id: req.params.userId });
        // Sending the task as a response
        res.json(exp);
    } catch (err) {
        // If an error occurs, sending the error as a response
        res.json({ err });
    }
};

// Controller function to delete a task from the list
exports.delTodolist = (req, res) => {
    // Finding a task with the given id from the database and deleting it
    userModel.findOneAndDelete({ _id: req.params.userId }, (err, data) => {
        if (err) {
            // If an error occurs, sending the error as a response
            res.json({ err });
        } else {
            // Sending the deleted task as a response
            res.json(data);
        }
    });
};

// Controller function to update a task in the list
exports.updateTodolist = (req, res) => {
    // Finding a task with the given id from the database and updating it with the new request body
    userModel.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, data) => {
        if (err) {
            // If an error occurs, sending the error as a response
            res.json({ err });
        } else {
            // Sending the updated task as a response
            res.json(data);
        }
    });
};
