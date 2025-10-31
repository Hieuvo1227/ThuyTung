const mongoose = require('mongoose');

// MongoDB connection URL from the .env file
const DATABASE_MONGO_URL = 'mongodb://localhost:27017/thuytungDB';

// User schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    name: String,
    phone: String,
    status: String,
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

async function checkUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(DATABASE_MONGO_URL, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000
        });
        console.log('Connected to MongoDB successfully');

        // Check if root user exists
        const rootUser = await User.findOne({ email: 'hieuvo1227@gmail.com' });
        
        if (rootUser) {
            console.log('Root user found:');
            console.log('Email:', rootUser.email);
            console.log('Status:', rootUser.status);
            console.log('Name:', rootUser.name);
            
            // If user is not active, update status to active
            if (rootUser.status !== 'active') {
                console.log('Updating user status to active...');
                await User.updateOne(
                    { email: 'hieuvo1227@gmail.com' }, 
                    { status: 'active' }
                );
                console.log('User status updated to active');
            } else {
                console.log('User is already active');
            }
        } else {
            console.log('Root user not found');
        }
        
        // Close connection
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
    }
}

checkUser();