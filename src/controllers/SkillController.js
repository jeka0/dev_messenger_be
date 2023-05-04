
const skillService = require("../services/skillService");
require('dotenv').config()

async function createSKill(req, res){
    const { name } = req.body;
    const userId = req.userId;

    skillService.createSKill(userId, {name})
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function getUserSkills(req, res){
    const { id } = req.params;

    skillService.getUserSkills(id)
    .then((skill)=>res.send(skill))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteSkill(req, res){
    const { id } = req.params;
    const userId = req.userId;

    skillService.deleteSkill(id, userId)
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    createSKill,
    deleteSkill,
    getUserSkills
};