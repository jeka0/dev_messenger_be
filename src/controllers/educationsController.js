
const educationService = require("../services/educationService");
require('dotenv').config()

async function createEducation(req, res){
    const { institution_name, Speciality, start_year, end_year } = req.body;
    const userId = req.userId;

    educationService.createEducations(userId, {institution_name, Speciality, start_year, end_year})
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function getUserEducations(req, res){
    const { id } = req.params;

    educationService.getUserEducations(id)
    .then((education)=>res.send(education))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteEducation(req, res){
    const { id } = req.params;
    const userId = req.userId;

    educationService.deleteEducation(id, userId)
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    createEducation,
    deleteEducation,
    getUserEducations
};