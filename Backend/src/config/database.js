const mongoose = require('mongoose')

function connectToDb(){
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
        console.error('❌ MONGO_URI is not set in .env file');
        console.error('Please add MONGO_URI to your .env file');
        process.exit(1);
    }

    console.log('🔄 Connecting to MongoDB...');
    
    mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        retryWrites: true,
        w: 'majority',
        connectTimeoutMS: 10000,
        family: 4 // Use IPv4, skip trying IPv6
    })
    .then(() => {
        console.log("✅ Connected to MongoDB successfully");
    })
    .catch(err=>{
        console.error("❌ Error Connecting to MongoDB");
        console.error("Error message:", err.message);
        
        if (err.message.includes('auth failed')) {
            console.error('\n⚠️  Authentication failed. Check your credentials in MONGO_URI');
        }
        if (err.message.includes('ENOTFOUND') || err.message.includes('getaddrinfo')) {
            console.error('\n⚠️  Cannot reach the MongoDB server. Check your connection string');
        }
        
        console.error('\nMongoDB Connection String:', mongoUri.substring(0, 20) + '...');
        process.exit(1);
    })

    // Monitor connection events
    mongoose.connection.on('disconnected', () => {
        console.warn('⚠️  MongoDB disconnected');
    })
    
    mongoose.connection.on('reconnected', () => {
        console.log('✅ MongoDB reconnected');
    })
    
    mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err.message);
    })
}

module.exports = connectToDb