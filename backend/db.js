/**
 Mongoose connection to a MongoDB Atlas cluster.
 @module database
 */
const mongoose = require("mongoose")

/**

 MongoDB Atlas database configuration options.
 @typedef {Object} DBOptions
 @property {boolean} useNewUrlParser - Enables the new MongoDB Node.js driver's URL parser.
 @property {boolean} useUnifiedTopology - Enables the new unified topology engine for MongoDB driver.
 */
/**
 MongoDB Atlas cluster URL configuration parameters.
 @typedef {Object} ClusterParams
 @property {string} user - The MongoDB Atlas username for the cluster.
 @property {string} password - The MongoDB Atlas password for the cluster.
 @property {string} clusterUrl - The MongoDB Atlas cluster URL.
 @property {string} dbName - The name of the database to use.
 */
const user = "user"
const password = "password"
const clusterUrl = "todo.pfpdhkb.mongodb.net"
const dbName = "Todo"

const uri = `mongodb+srv://${user}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`
/**
 Connects to a MongoDB Atlas cluster.
 @function
 @param {string} uri - The connection URI for the MongoDB Atlas cluster.
 @param {DBOptions} options - The options for configuring the MongoDB driver.
 @returns {Promise} The Promise returned by Mongoose's connect() function.
 */
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose
