import Image from "../models/Image.js";

const uploadImage = async (req,res) =>{
    try{
        const {name, folderId} = req.body;
        if(!req.file || !name || !folderId){
            return res.status(501).json({
                error:"Please provide all required fields: image file,name, and folderId"
            })
        }
        const image = new Image({
            name,
            imageUrl: req.file.path,
            folderId,
            userId: userId
        })
        await image.save();
        return res.status(200).json({
            message:"Image Uploaded Successfully",
            image:{
                name: image.name,
                imageUrl: image.imageUrl,
                folderId: image.folderId,
                userId: image.userId,
                id: image._id
            }
        })
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({
            error:"Internal Server Error during uploading Image",
            message: err.message
        })
    }
}

const serchImage = async (req,res)=>{
    try{
        const {folderId, query} = req.query;
        if(!folderId || !query){
            return res.status(400).json({
                error:"Please provide folderId and query string"
            })
        }
        const images = await Image.find({
            FolderId:folderId,
            name: { $regex: query, $options: 'i' } 
        })
        return res.status(200).json({
            message:"Images Fetched Successfully",
            images: images.map(image => ({
                name: image.name,
                imageUrl: image.imageUrl,
                folderId: image.FolderId,
                userId: image.userId,
                id: image._id
            }))
        })
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({
            error:"Internal Server Error during Searching Image",
            message: err.message
        })
    }
}

const getImages = async (req,res)=>{
    try{
        const {folderId} = req.query;
        if(!folderId){
            return res.status(400).json({
                error:"Please provide folderId"
            })
        }
        const images = await Image.find({FolderId: folderId});
        return res.status(200).json({
            message:"Images Fetched Successfully",
            images: images.map(image => ({
                name: image.name,
                imageUrl: image.imageUrl,
                folderId: image.FolderId,
                userId: image.userId,
                id: image._id
            }))
        })
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({
            error:"Internal Server Error during fetching Images",
            message: err.message
        })
    }
}

export {uploadImage, serchImage, getImages};