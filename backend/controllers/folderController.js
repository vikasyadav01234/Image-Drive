import Folder from '../models/Folder.js'
import {ObjectId} from 'mongoose'
const createFolder = async (req,res)=>{
    try{
        const {name,parentFolderId} = req.body;
        const userId = req.user._id.toString(); 
        if(!name){
            return res.status(400).json({error:"Please provide a folder name"});
        }
        const folder = new Folder({
            name,
            parentFolderId: parentFolderId || null,
            userId: userId // Assuming req.user is set by an authentication middleware
        })
        await folder.save();
        return res.status(200).json({
            message:"Folder Created Successfully",
            folder:{
                name: folder.name,
                id: folder._id,
                parentFolderId: folder.parentFolderId,
                userId: folder.userId
            }
        })
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({
            error: "Internal Server Error",
            message: err.message
        })
    }
}

const getFolders = async (req,res)=>{
    try{
        // const vikas = req.user._id.toString();
        // console.log(typeof vikas);
        // console.log("User ID:", vikas);
        const userId = req.user._id.toString();
        console.log("Fetching folders for user:", userId);
        const folders = await Folder.find({userId})
        console.log(folders);
        return res.status(200).json({
            message: "Folders Fetched Successfully",
            folders: folders.map(folder=>({
                name: folder.name,
                id: folder._id,
                parentFolderId: folder.parentFolderId,
                userId: folder.userId
            }))
        })
    }
    catch(err){
        console.log("Error in fetching Folders:", err.message);
        res.status(500).json({
            error:"Internal Server Error",
            message: err.message
        })
    }
}

const deleteFolder = async (req,res)=>{
    try{
        const {folderId} = req.params;
        if(!folderId){
            return res.status(400).json({error:"Please provide folderId"});
        }
        const folder = await Folder.findById(folderId);
        if(!folder){
            return res.status(404).json({error:"Folder Not Found"});
        }
        // Check if the folder belongs to the user
        if(folder.userId.toString() !== req.user._id.toString()){
            return res.status(403).json({error:"You are not authorized to delete this folder"});
        }
        // Delete the folder
        await Folder.findByIdAndDelete(folderId);
        return res.status(200).json({
            message:"Folder Deleted Successfully",
            folderId: folderId
        })
    }
        catch(err){
        console.log(err.message);
        res.status(500).json({
            error:"Internal Server Error",
            message: err.message
        })
    }
}
export {createFolder, getFolders,deleteFolder};
