import Folder from '../models/Folder.js'

const createFolder = async (req,res)=>{
    try{
        const {name,parentFolderId,userId} = req.body;
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
        const {userId} = req.body
        const folders = await Folder.find({userId})
        console.log("Folders Fetched:", folders);
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

export {createFolder, getFolders};
