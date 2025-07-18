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
    FolderId:{
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

module.exports = mongoose.model("Image",imageSchema);