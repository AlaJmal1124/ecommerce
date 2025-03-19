var express= require('express');
var router = express.Router();
const Categorie =require('../Modele/categories');
const { verifyToken } = require('../Middleware/verify-token');


router.get('/',async(req,res)=>{
    try {
        const cat = await Categorie.find();
        
        res.status(200).json(cat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }}
);
router.post('/', verifyToken, async(req,res)=>{
    const { nomcategorie, imagecategorie } = req.body;
    const newCategorie = new Categorie({nomcategorie:nomcategorie, imagecategorie:imagecategorie})
        try {
        await newCategorie.save();
        res.status(200).json(newCategorie );
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
    
});
router.get('/:categorieId',async(req,res)=>{
    try {
        const cat = await Categorie.findById(req.params.categorieId);
        
        res.status(200).json(cat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }}
);

router.put('/:categorieId', async (req, res)=> {
    try{
        const cat11 = await Categorie  .findByIdAndUpdate(
            req.params.categorieId,
            {$set :req.body},
            {new:true}
        );
        res.status(200).json(cat1);

    }
    catch(error){
    res. status(404).json({ message: error.message});
    }
});

router.delete('/:categorieId', async (req, res)=> {
    try {
        const cat = await Categorie.findById(req.params.categorieId);
    const id = req.params.categorieId;
    await Categorie.findByIdAndDelete(id);
    res.json({message:"categoriedeleted successfully"});

    }catch(error){
        res. status(404).json({ message: error.message});}
});
module.exports = router;