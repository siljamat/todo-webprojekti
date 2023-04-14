// Importing the Mongoose module
const mongoose = require("mongoose");

// Storing the connection string for the MongoDB Atlas cluster in a variable called uri
const uri = 'mongodb+srv://tuisku:mongoPass@todocluster.mner2t0.mongodb.net/?retryWrites=true&w=majority';

// Connecting to the MongoDB Atlas cluster using the Mongoose connect method
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Logging a message to the console if the connection is successful
        console.log('Successfully connected to MongoDB');
    })
    .catch((error) => {
        // Logging an error message to the console if the connection is unsuccessful
        console.log('Error connecting to MongoDB', error);
    });

// Exporting the Mongoose connection object to be used in other parts of the application
module.exports = mongoose.connection;
