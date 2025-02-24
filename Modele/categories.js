const mongoose=require("mongoose")
const categoriesSchema=mongoose.Schema({
    nomcategorie:{type:String, required: true, unique:true},
    imagecategorie :{type:String,required:false}
})
module.exports=mongoose.model('categories',categoriesSchema)

