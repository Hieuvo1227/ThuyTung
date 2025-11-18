import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Program } from './src/models/program.model.js';

// Load environment variables
dotenv.config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thuytung';

console.log('Connecting to MongoDB...');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return updateProgramImages();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

async function updateProgramImages() {
  try {
    // Update all programs to use the placeholder image
    const result = await Program.updateMany(
      {}, // Update all programs
      { 
        $set: { 
          imageUrl: '/images/placeholder-program.jpg' 
        } 
      }
    );
    
    console.log(`Updated ${result.modifiedCount} programs with placeholder images`);
    
    // Display the updated programs
    const programs = await Program.find({});
    console.log('Updated programs:');
    programs.forEach(program => {
      console.log(`- ${program.title}: ${program.imageUrl}`);
    });
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error updating programs:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}