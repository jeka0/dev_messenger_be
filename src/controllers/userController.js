
const userService = require("../services/userService");
require('dotenv').config()

async function deleteUser(req, res){
    const userId = req.userId;

    userService.deleteCurrentUser(userId)
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function updateUser(req, res){
    const { email, password, firstName, lastName, image } = req.body;
    const userId = req.userId;

    userService.updateCurrentUser(userId, {email, password, firstName, lastName, image})
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function getUser(req, res){
    const { id } = req.params;

    userService.getUserByID(id)
    .then((user)=>{
        const { password, ...userData } = user;

        res.send(userData);
    }).catch((err)=>res.status(400).send(err.message));
}

async function getCurrentUser(req, res){
    const userId = req.userId;
    userService.getUserByID(userId)
    .then((user)=>{
        const { password, ...userData } = user;

        res.send(userData);
    }).catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    getCurrentUser,
    getUser,
    updateUser,
    deleteUser
};