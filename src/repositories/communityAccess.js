const dbAccess = require("./dbAccess.js")
const { ILike } = require("typeorm");
const communityRep = dbAccess.AppDataSource.getRepository("Community");

async function createCommunity(community){
   return await communityRep.save(community)
}

async function getAllCommunitys(){
    return await communityRep.find({
        relations:['users'] 
    })
}

async function getCommunityByID(id){
    return await communityRep.findOne({
        where:{
            id 
        }, 
        relations:['users'] 
    })
}

async function getUserCommunitys(userId){
    return await communityRep.find({
        where:{
            users:{
                id: userId
            }
        }, 
        relations:['users'] 

    })
}

async function getCommunityByName(name){
    return await communityRep.findOne({
        where:{
            name
        }, 
        relations:['users'] 
    })
}

async function searchCommunity(text){
    return await communityRep.find({
        where:{
            name: ILike(`%${text}%`)
        }
    })
}

async function deleteCommunity(id){
    return await communityRep.delete({ id });
}

async function updateCommunity(id, data){
    return await communityRep.update({ id }, data)
}

module.exports = {
    createCommunity,
    getAllCommunitys,
    getUserCommunitys,
    getCommunityByID,
    getCommunityByName,
    deleteCommunity,
    updateCommunity,
    searchCommunity
};