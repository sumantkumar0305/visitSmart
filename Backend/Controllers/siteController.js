import siteSchema from '../Models/SiteData.js'
import mongoose from 'mongoose';

export const findSiteData = async(req,res)=>{
    try{
        const data = await siteSchema.find({});
        return res.json(data);
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err.message || "Palce data are not find" });
    }
}

export const findSingalData = async(req, res)=>{
    try{
        let ID = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(ID)) {
            return res.status(500).json({ message: "Invalid site ID", type: "error" });
        }
        let singalData = await siteSchema.findById(ID).populate("review").populate("hotel");
        return res.json(singalData);
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err.message ||"This palace data are not find" });
    }
}