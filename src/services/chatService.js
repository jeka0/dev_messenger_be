const chatAccess = require("../repositories/chatAccess");
const { getUserByID } = require("./userService");
const { deleteFile } = require("../helpers/fs");

async function createChat(chat){
    if(chat.name){
        if(await chatAccess.getChatByName(chat.name)){
          throw new Error("A chat with the same name already exists");
        }
    }

    return chatAccess.createChat(chat);
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

 async function joinUser(id, userId){
  const chat = await chatAccess.getChatByID(id);
  const user = await getUserByID(userId);

  if(!chat){
    throw new Error("Chat not found");
  }

  if(!user){
      throw new Error("User not found");
  }

  if(!chat.users.some((u)=>u.id===user.id))chat.users.push(user);
  const updatedchat = await chatAccess.createChat(chat);
  deleteInfo(updatedchat);
  return updatedchat;
 }

 async function leaveUser(id, userId){
  const chat = await chatAccess.getChatByID(id);

  if(!chat){
    throw new Error("Chat not found");
  }

  const index = chat.users.findIndex(user=>user.id===userId);
  if (index > -1) {
    chat.users.splice(index, 1);
  }
  const updatedChat = await chatAccess.createChat(chat);
  deleteInfo(updatedChat);
  return updatedChat;
}

 function deleteInfo(chat){
  chat.users.forEach((user, index)=>{chat.users[index] = {id:user.id}})
}
 
 module.exports = {
    createChat,
    getAllChats,
    getChatByID,
    getChatByName,
    deleteChat,
    updateChat,
    joinUser,
    leaveUser
 };

