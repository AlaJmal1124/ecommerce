const mongoose=require("mongoose")
const scategorie= require("./scategories");
const articleSchema=mongoose.Schema({
    reference:{type:String,required:true,unnique:true},
    designation:{type:String,required:true,unnique:true},
    prix:{type: Number, required: false },
    marque:{type: String, required:true },
    qtestock:{ type: Number, required : false },
    imageart: { type: String, required: false },
    scategorieID: {type:mongoose.Schema.Types.ObjectId,ref:scategorie}
})
module.exports=mongoose.model('articles',articleSchema)