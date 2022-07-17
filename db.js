require ("dotenv").config()
const mongoose = require ('mongoose');
const connectionString = "mongodb://localhost:27017"

module.exports = function(){
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    }).then(
         console.log('database connection successful')
    
)
}
