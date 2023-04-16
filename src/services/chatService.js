const chatAccess = require("../repositories/chatAccess");
const { deleteFile } = require("../helpers/fs");

async function createChat(chat){
    if(chat.name){
        if(await chatAccess.getChatByName(chat.name)){
          throw new Error("A chat with the same name already exists");
        }
    }

    chatAccess.createChat(chat);
 }
 
 async function getAllChats(){
    return await chatAccess.getAllChats();
 }
 
 async function getChatByID(id){
    const chat = await chatAccess.getChatByID(id);
    
    if(!chat){
      throw new Error("Chat is not found");
    }

    return chat;
 }
 
 async function getChatByName(name){
    const chat = await chatAccess.getChatByName(name);

    if(!chat){
        throw new Error("Chat is not found");
      }
  
      return chat;
 }
 
 async function deleteChat(id){
   const chat = await chatAccess.getChatByID(id);
    
    if(!chat){
      throw new Error("Chat is not found");
    }

    deleteFile(chat.image);

    return await chatAccess.deleteChat(id);
 }
 
 async function updateChat(id, data){
   const chat = await chatAccess.getChatByID(id);
    
   if(!chat){
     throw new Error("Chat is not found");
   }

   if(data.name){
      if(await chatAccess.getChatByName(data.name)){
        throw new Error("A chat with the same name already exists");
      }
   }

   if(data.image)deleteFile(chat.image);

   return await chatAccess.updateChat(id, data);
 }
 
 module.exports = {
    createChat,
    getAllChats,
    getChatByID,
    getChatByName,
    deleteChat,
    updateChat
 };

