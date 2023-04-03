const dbAccess = require("./dbAccess.js")
const userRep = dbAccess.AppDataSource.getRepository("User");

async function createUser(user){
   return await userRep.save(user)
}

async function getAllUsers(){
    return await userRep.find()
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
    getAllUsers,
    getUserByID,
    getUserByEmail,
    deleteUser,
    updateUser
};