const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        retryWrites: true,
        w: 'majority',
        ssl: true,
        tlsAllowInvalidCertificates: true,
        retryWrites: true,
        authSource: 'admin',
        connectTimeoutMS: 10000
    })
    .then(() => {
        console.log("Connected to DB")
    })
    .catch(err=>{
        console.log("Error Connecting to DB", err.message)
        console.log("MongoDB URI:", process.env.MONGO_URI ? "✓ Set" : "✗ Not set")
        console.log("Full error:", err)
        process.exit(1)
    })

    // Monitor connection events
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected')
    })

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB connection error:', err.message)
    })
}

module.exports = connectToDb