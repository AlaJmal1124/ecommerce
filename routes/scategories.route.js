const express = require('express');
const router = express.Router();
const SCategories=require("../Modele/scategories")

router.get('/', async (req, res, )=> {
try {
const scat = await SCategorie.find({}, null, {sort: {'_id': -1}}).populate("categorieID")
res.status(200).json(scat);
} catch (error) {
res.status(404).json({ message: error.message });
}
});

router.post('/', async (req, res) => {
const { nomscategories, imagescat,categorieID} = req.body;
const newSCategorie = new SCategorie({nomscategorie:nomscategorie,
imagescat:imagescat,categorieID:categorieID })
try {
await newSCategorie.save();
res.status(200).json(newSCategorie );
} catch (error) {
res.status(404).json({ message: error.message });
}
});
module.exports = router;