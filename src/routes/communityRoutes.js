const router = require('express').Router();
const {celebrate} = require('celebrate');
const communitySchems = require("../validation/communitySchems");
const { upload } = require('../middlewares/image')

const { createCommunity, getAllCommunitys, deleteCommunity, updateCommunity, getCommunity, getCommunityByName, joinUser, leaveUser } = require('../controllers/communityController.js');

router.get('/all', getAllCommunitys);
router.get('/:id', celebrate(communitySchems.id), getCommunity);
router.post('/join/:id', celebrate(communitySchems.id), joinUser);
router.post('/leave/:id', celebrate(communitySchems.id), leaveUser);
router.post('/', celebrate(communitySchems.getByName), getCommunityByName);
router.post('/create', upload.single("image"), celebrate(communitySchems.create), createCommunity)
router.put('/:id', celebrate(communitySchems.id), upload.single("image"), celebrate(communitySchems.update), updateCommunity);
router.delete('/:id', celebrate(communitySchems.id), deleteCommunity);


module.exports = router;