import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to db");
    } catch (error) {
        console.error(`error connecting to db: ${error.message}` );
        process.exit(1);
    }
}