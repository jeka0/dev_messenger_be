const communityAccess = require("../repositories/communityAccess");
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
    return await communityAccess.getAllCommunitys();
 }
 
 async function getCommunityByID(id){
    const community = await communityAccess.getCommunityByID(id);
    
    if(!community){
      throw new Error("Community is not found");
    }

    return community;
 }
 
 async function getCommunityByName(name){
    const community = await communityAccess.getCommunityByName(name);

    if(!community){
        throw new Error("Community is not found");
      }
  
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
 
 module.exports = {
    createCommunity,
    getAllCommunitys,
    getCommunityByID,
    getCommunityByName,
    deleteCommunity,
    updateCommunity
 };

