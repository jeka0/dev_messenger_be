const communityAccess = require("../repositories/communityAccess");
const { deleteChat } = require("./chatService");
const { getUserByID } = require("./userService");
const { deleteFile } = require("../helpers/fs");

async function createCommunity(community){
    if(community.name){
        if(await communityAccess.getCommunityByName(community.name)){
          throw new Error("A community with the same name already exists");
        }
    }

    communityAccess.createCommunity(community);
 }
 
 async function getAllCommunitys(){
    const communitys = await communityAccess.getAllCommunitys();

    communitys.forEach(community=>deleteInfo(community));

    return communitys;
 }
 
 async function getCommunityByID(id){
    const community = await communityAccess.getCommunityByID(id);
    
    if(!community){
      throw new Error("Community is not found");
    }

    deleteInfo(community);

    return community;
 }
 
 async function getCommunityByName(name){
    const community = await communityAccess.getCommunityByName(name);

    if(!community){
        throw new Error("Community is not found");
      }

      deleteInfo(community);
  
      return community;
 }
 
 async function deleteCommunity(id){
   const community = await communityAccess.getCommunityByID(id);
    
    if(!community){
      throw new Error("Community is not found");
    }

    deleteFile(community.image);

    return await communityAccess.deleteCommunity(id);
 }
 
 async function updateCommunity(id, data){
   const community = await communityAccess.getCommunityByID(id);
    
   if(!community){
     throw new Error("Community is not found");
   }

   if(data.name){
      if(await communityAccess.getCommunityByName(data.name)){
        throw new Error("A community with the same name already exists");
      }
   }

   if(data.image)deleteFile(community.image);

   return await communityAccess.updateCommunity(id, data);
 }

 async function joinUser(id, userId){
  const community = await communityAccess.getCommunityByID(id);
  const user = await getUserByID(userId);

  if(!community){
    throw new Error("Community not found");
  }

  if(!user){
      throw new Error("User not found");
  }

  if(!community.users.some((u)=>u.id===user.id))community.users.push(user);
  const updatedCommunity = await communityAccess.createCommunity(community);
  deleteInfo(updatedCommunity);
  return updatedCommunity;
 }

 async function leaveUser(id, userId){
  const community = await communityAccess.getCommunityByID(id);

  if(!community){
    throw new Error("Community not found");
  }

  const index = community.users.findIndex(user=>user.id===userId);
  if (index > -1) {
    community.users.splice(index, 1);
  }
  const updatedCommunity = await communityAccess.createCommunity(community);
  deleteInfo(updatedCommunity);
  return updatedCommunity;
}

 function deleteInfo(community){
  community.users.forEach((user, index)=>{community.users[index] = {id:user.id}})
}
 
 module.exports = {
    createCommunity,
    getAllCommunitys,
    getCommunityByID,
    getCommunityByName,
    deleteCommunity,
    updateCommunity,
    joinUser,
    leaveUser
 };

