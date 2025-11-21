import mongoose from "mongoose";



const connectDB = async() =>{
    try{
        let mongodbURI = process.env.MONGODB_URI;
        const projectName = "Resume_Builder";
        if(!mongodbURI){
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        if(mongodbURI.endsWith('/')){
            mongodbURI = mongodbURI.slice(0,-1);
        }

        await mongoose.connect(`${mongodbURI}/${projectName}`);
        console.log("Database connected successfully 🎓🎓😎");
    }
    catch(error){
        console.error("Error while connecting to database", error);

    }
}



export default connectDB;