const dbAccess = require("./dbAccess.js")
const skillRep = dbAccess.AppDataSource.getRepository("Skill");

async function createSkill(skill){
   return await skillRep.save(skill)
}

async function getSkill(id){
    return await skillRep.findOne({
        where:{
            id 
        }, 
        relations:['user'] 
    });
}

async function getUserSkills(userId){
    return await skillRep.find({
        where:{
            user:{
                id: userId
            },
        },

    })
}

async function deleteSkill(id){
    return await skillRep.delete({ id });
}

module.exports = {
    createSkill,
    getUserSkills,
    deleteSkill,
    getSkill,
};