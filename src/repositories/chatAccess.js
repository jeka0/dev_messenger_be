const dbAccess = require("./dbAccess.js")
const chatRep = dbAccess.AppDataSource.getRepository("Chat");

async function createChat(chat){
   return await chatRep.save(chat)
}

async function getAllChats(){
    return await chatRep.find()
}

async function getChatByID(id){
    return await chatRep.findOneBy({ id })
}

async function getChatByName(name){
    return await chatRep.findOneBy({ name })
}

async function deleteChat(id){
    return await chatRep.delete({ id });
}

async function updateChat(id, data){
    return await chatRep.update({ id }, data)
}

module.exports = {
    createChat,
    getAllChats,
    getChatByID,
    getChatByName,
    deleteChat,
    updateChat
};