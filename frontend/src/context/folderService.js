import API from "../services/axios";

export const getFolders = async()=>{
    try{
        const res = await API.get("/folder/getfolders");
        return res.data.folders;
    }catch(err){
        console.error("Error fetching folders:", err);
        throw err;
    }
}