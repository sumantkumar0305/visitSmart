import siteSchema from '../Models/SiteData.js'

export const findSiteData = async(req,res)=>{
    try{
        const data = await siteSchema.find({});
        return res.json(data);
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: error.message });
    }
}

export const findSingalData = async(req, res)=>{
    try{
        let ID = req.params.id;
        let singalData = await siteSchema.findById(ID);
        return res.json(singalData);
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}