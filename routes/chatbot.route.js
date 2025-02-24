const express = require('express');
const axios = require('axios'); 
const Message = require('../Modele/message');
const router = express.Router();
router.use(express.json());

router.post("/ask", async (req, res) => {
try {
const { question } = req.body;
if (!question) return res.status(400).json({ error: " Question requise" });

const { data } = await axios.post(process.env.OLLAMA_API_URL, {
model: process.env.OLLAMA_MODEL,
prompt: question,
stream: false 
}, {
headers: { "Content-Type": "application/json" }
});
if (!data || !data.response) throw new Error("Réponse invalide d'Ollama");
const responseText = data.response;
console.log(`Réponse Ollama: ${responseText}`);

const newMessage = new Message({ text: question, response: responseText });
await newMessage.save();
res.json({ question, response: responseText });
} catch (error) {
console.error("Erreur:", error.message);
res.status(500).json({ error: "Erreur interne", details: error.message });
}
});
router.get("/messages", async (req, res) => {
    try {
    const messages = await Message.find();
    res.json(messages);
    } catch (error) {
    res.status(500).json({ error: "Erreur de récupération", details: error.message
    });
    }
    });
    module.exports = router;