const mongoose = require("mongoose")

const user = "siljama"
const password = "salasana12345"
const clusterUrl = "todo.pfpdhkb.mongodb.net"
const dbName = "Todo"

const uri = `mongodb+srv://${user}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose
