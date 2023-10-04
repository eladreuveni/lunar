import mongoose from "mongoose";
mongoose.set('debug', true);

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!,
            { dbName: 'lunar' });
        console.log('connected to MongoDB!')
    } catch (error) {
        console.log("error connecting to MongoDB: ", error)
    }
}

export default connectMongoDB;