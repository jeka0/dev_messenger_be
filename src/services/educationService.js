const educationAccess = require("../repositories/education");
const { getUserByID } = require("./userService");
async function createEducations(userId, data){
    data.user = await getUserByID(userId);

    const education = await educationAccess.createEducation(data)

    if(!education){
        throw new Error("Error creating Education");
    }

    return education;
}

async function deleteEducation(id, userId){
    const education = await educationAccess.getEducation(id);

    if(education?.user.id !== userId){
        throw new Error("Access denied");
    }

    const deletedEducation = await educationAccess.deleteEducation(id);

    if(!deletedEducation){
        throw new Error("Error deleting Education");
    }

    return deletedEducation;
}

async function getUserEducations(userId){
    return await educationAccess.getUserEducations(userId);
  }


module.exports = {
    createEducations,
    deleteEducation,
    getUserEducations
};