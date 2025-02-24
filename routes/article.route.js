const express = require('express');
const router = express.Router();
const Article=require("../Modele/article")

router.get('/', async (req, res, )=> {
    try {
    const articles = await Article.find({}, null, {sort: {'_id': -
    1}}).populate("scategorieID").exec();
    res.status(200).json(articles);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

    module.exports = router;