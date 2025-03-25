const express = require ('express')
const mongoose=require('mongoose')
const dotenv=require("dotenv")
const cors=require("cors")
const path = require('path');
const app=express()
const categoriesRouter = require("./routes/categories.route")
const scategorieRouter =require("./routes/scategories.route")
const articleRouter =require("./routes/article.route")
const chatbotRouter=require("./routes/chatbot.route")
const UserRouter=require("./routes/user.route")
const chatbotRequeteRouter = require("./routes/chatbot-requete.route")
const paymentRouter =require("./routes/payment.route.js");
app.use(express.json())
app.use(cors())
dotenv.config()
//app.get('/',(req,res)=>{
    //res.send("bienvenue dans notre site")
//})

mongoose.connect(process.env.DATABASECLOUD)
.then(()=>{console.log("connexion a la base de donné réussie")})
.catch((error)=>{console.log("impossible de se connecter à la base de données",error)
process.exit()
})
app.use("/api/categories",categoriesRouter)
app.use("/api/scategories",scategorieRouter)
app.use("/api/articles",articleRouter)
app.use("/api/chat",chatbotRouter)
app.use("/api/users",UserRouter)
app.use('/api/chatbot', chatbotRequeteRouter);
app.use('/api/payment', paymentRouter);
app.use(express.static(path.join(__dirname, './client/build'))); // Route pour
//les pages non trouvées, redirige vers index.html
app.get('*', (req, res) => { res.sendFile(path.join(__dirname,
'./client/build/index.html')); });

app.listen(process.env.PORT,function(){
    console.log(`serveur is listen on port ${process.env.PORT}`)
})
module.exports = app;