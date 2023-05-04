const dbAccess = require("./dbAccess.js")
const educationRep = dbAccess.AppDataSource.getRepository("Education");

async function createEducation(education){
   return await educationRep.save(education)
}

async function getEducation(id){
    return await educationRep.findOne({
        where:{
            id 
        }, 
        relations:['user'] 
    });
}

async function getUserEducations(userId){
    return await educationRep.find({
        where:{
            user:{
                id: userId
            },
        },

    })
}

async function deleteEducation(id){
    return await educationRep.delete({ id });
}

module.exports = {
    createEducation,
    getUserEducations,
    deleteEducation,
    getEducation,
};