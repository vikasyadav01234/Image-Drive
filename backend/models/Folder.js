import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
       // unique:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    parentFolderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Folder",
        default:null,
    }

},{timestamps:true});

module.exports = mongoose.model("Folder",folderSchema);