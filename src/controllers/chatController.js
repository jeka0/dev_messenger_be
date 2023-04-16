
const chatService = require("../services/chatService");
require('dotenv').config()

async function createChat(req, res){
    const { name, image } = req.body;

    chatService.createChat({name, image})
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllChats(req, res){
    chatService.getAllChats()
    .then((chats)=>res.send(chats))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteChat(req, res){
    const { id } = req.params;

    chatService.deleteChat(id)
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function updateChat(req, res){
    const { name, image } = req.body;
    const { id } = req.params;

    chatService.updateChat(id, {name, image})
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function getChat(req, res){
    const { id } = req.params;

    chatService.getChatByID(id)
    .then((chat)=>res.send(chat))
    .catch((err)=>res.status(400).send(err.message));
}

async function getChatByName(req, res){
    const { name } = req.body;
    chatService.getChatByName(name)
    .then((chat)=>res.send(chat))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    createChat,
    getAllChats,
    deleteChat,
    updateChat,
    getChat,
    getChatByName
};