import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    folderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Folder",
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true});

const Image = mongoose.model("Image",imageSchema);

export default Image;