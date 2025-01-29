import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`, {
            writeConcern: { w: 'majority' }, // Optional: Add if needed
        });
        console.log('Database is connected');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1); // Exit the application on database connection failure
    }
};

export default ConnectDB;
