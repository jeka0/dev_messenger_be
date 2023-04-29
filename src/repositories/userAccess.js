const dbAccess = require("./dbAccess.js")
const { ILike } = require("typeorm");
const userRep = dbAccess.AppDataSource.getRepository("User");

async function createUser(user){
   return await userRep.save(user)
}

async function getAllUsers(){
    return await userRep.find()
}

async function searchUser(text){
    return await userRep.find({
        where:{
            email: ILike(`%${text}%`)
        }
    })
}

async function getUserByID(id){
    return await userRep.findOneBy({ id })
}

async function getUserByEmail(email){
    return await userRep.findOneBy({ email })
}

async function deleteUser(id){
    return await userRep.delete({ id });
}

async function updateUser(id, data){
    return await userRep.update({ id }, data)
}

module.exports = {
    createUser,
    searchUser,
    getAllUsers,
    getUserByID,
    getUserByEmail,
    deleteUser,
    updateUser
};