
const communityService = require("../services/communityService");
require('dotenv').config()

async function createCommunity(req, res){
    const { name, image } = req.body;

    communityService.createCommunity({name, image})
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllCommunitys(req, res){
    communityService.getAllCommunitys()
    .then((communitys)=>res.send(communitys))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteCommunity(req, res){
    const { id } = req.params;

    communityService.deleteCommunity(id)
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function updateCommunity(req, res){
    const { name, image } = req.body;
    const { id } = req.params;

    communityService.updateCommunity(id, {name, image})
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function getCommunity(req, res){
    const { id } = req.params;

    communityService.getCommunityByID(id)
    .then((community)=>res.send(community))
    .catch((err)=>res.status(400).send(err.message));
}

async function getCommunityByName(req, res){
    const { name } = req.body;
    communityService.getCommunityByName(name)
    .then((community)=>res.send(community))
    .catch((err)=>res.status(400).send(err.message));
}

async function joinUser(req, res){
    const { id } = req.params;
    const userId = req.userId;

    communityService.joinUser(id, userId)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

async function leaveUser(req, res){
    const { id } = req.params;
    const userId = req.userId;

    communityService.leaveUser(id, userId)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    createCommunity,
    getAllCommunitys,
    deleteCommunity,
    updateCommunity,
    getCommunity,
    getCommunityByName,
    joinUser,
    leaveUser
};