import mongoose from "mongoose";

const connectMongoDB =async()=>{
    try{
  await mongoose.connect(process.env.MONGODG_URI)
   console.log("Connected to MOngoDB");
    }
    catch(error)
{

    console.log(error);
}

};
export default connectMongoDB;