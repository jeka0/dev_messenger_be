const dbAccess = require("./dbAccess.js")
const communityRep = dbAccess.AppDataSource.getRepository("Community");

async function createCommunity(community){
   return await communityRep.save(community)
}

async function getAllCommunitys(){
    return await communityRep.find()
}

async function getCommunityByID(id){
    return await communityRep.findOneBy({ id })
}

async function getCommunityByName(name){
    return await communityRep.findOneBy({ name })
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
    getCommunityByID,
    getCommunityByName,
    deleteCommunity,
    updateCommunity
};