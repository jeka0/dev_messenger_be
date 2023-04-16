const messageSevice = require("../services/messageService");

async function getMessage(req, res){
    const { id } = req.params;

    messageSevice.getMessage(id)
    .then((Message)=>res.send(Message))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllMessages(req, res){
    messageSevice.getAllMessages()
    .then((Messages)=>res.send(Messages))
    .catch((err)=>res.status(400).send(err.message));
}

async function updateMessage(req, res){
    const { id } = req.params;
    const { message } = req.body;
    const userId = req.userId;

    messageSevice.updateMessage(id, userId, { message })
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteMessage(req, res){
    const { id } = req.params;
    const userId = req.userId;

    messageSevice.deleteMessage(id, userId)
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function getRange(req, res){
    const { page, limit } = req.query;

    messageSevice.pagination(page, limit)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = { 
    getMessage, 
    getAllMessages, 
    updateMessage, 
    deleteMessage,
    getRange,
};