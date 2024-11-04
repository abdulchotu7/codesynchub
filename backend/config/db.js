import mongoose from "mongoose";

const dbconnect = async()=>{
    try{
        const con = await mongoose.connect('mongodb://localhost:27017/Dbfinal');
        console.log("connected to Database");
    }
    catch{
        console.log("error connecting to database")
    }
}

export default dbconnect;