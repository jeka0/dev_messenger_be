const router = require('express').Router();
const {celebrate} = require('celebrate');
const educationSchems = require("../validation/educationsSchems");

const { createEducation, deleteEducation, getUserEducations } = require('../controllers/educationsController');

router.get('/user/:id', celebrate(educationSchems.id), getUserEducations);
router.post('/create', celebrate(educationSchems.create), createEducation);
router.delete('/:id', celebrate(educationSchems.id), deleteEducation);


module.exports = router;