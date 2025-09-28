import { User } from "@/models/user";
import mongoose, { Schema } from "mongoose"

export const connectDB = async () => {

    try {
        const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
            dbName: "ProTrack"
        });

        console.log(" db connected...");
        // const usser = new User({
        //     name: "test",
        //     email:"test@gmail.com",
        //     password:"test"
        // })
        // await usser.save();
        // console.log("user created !")



    } catch (error) {
        console.log(error);
        // console.log("DB is not connected");

    }
}