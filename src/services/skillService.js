const skillAccess = require("../repositories/skillsAccess");
const { getUserByID } = require("./userService");
async function createSKill(userId, data){
    const skills = await skillAccess.getUserSkills(userId);
    if(skills.some(skill=>skill.name === data.name)){
        throw new Error("The user already has this skill added");
    }

    data.user = await getUserByID(userId);

    const skill = await skillAccess.createSkill(data)

    if(!skill){
        throw new Error("Error creating Skill");
    }

    return skill;
}

async function deleteSkill(id, userId){
    const skill = await skillAccess.getSkill(id);

    if(skill.user.id !== userId){
        throw new Error("Access denied");
    }

    const deletedSkill = await skillAccess.deleteSkill(id);

    if(!deletedSkill){
        throw new Error("Error deleting Skill");
    }

    return deletedSkill;
}

async function getUserSkills(userId){
    return await skillAccess.getUserSkills(userId);
  }


module.exports = {
    createSKill,
    deleteSkill,
    getUserSkills
};