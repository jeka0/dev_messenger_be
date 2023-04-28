const dbAccess = require("./dbAccess.js")
const chatRep = dbAccess.AppDataSource.getRepository("Chat");

async function createChat(chat){
   return await chatRep.save(chat)
}

async function getAllChats(){
    return await chatRep.find({
        relations:['users'] 
    })
}

async function getChatByID(id){
    return await chatRep.findOne({
        where:{
            id 
        }, 
        relations:['users'] 
    })
}

async function getChatByName(name){
    return await chatRep.findOne({
        where:{
            name
        }, 
        relations:['users'] 
    })
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