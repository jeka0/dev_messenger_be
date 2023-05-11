const router = require('express').Router();
const {celebrate} = require('celebrate');
const skillSchems = require("../validation/skillSchems");

const { createSKill, deleteSkill, getUserSkills } = require('../controllers/SkillController');

router.get('/user/:id', celebrate(skillSchems.id), getUserSkills);
router.post('/create', celebrate(skillSchems.create), createSKill)
router.delete('/:id', celebrate(skillSchems.id), deleteSkill);


module.exports = router;