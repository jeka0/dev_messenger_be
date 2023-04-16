const router = require('express').Router();
const {celebrate} = require('celebrate');
const communitySchems = require("../validation/communitySchems");
const { upload } = require('../middlewares/image')

const { createCommunity, getAllCommunitys, deleteCommunity, updateCommunity, getCommunity, getCommunityByName } = require('../controllers/communityController.js');

router.get('/all', getAllCommunitys);
router.get('/:id', celebrate(communitySchems.id), getCommunity);
router.post('/', celebrate(communitySchems.getByName), getCommunityByName);
router.post('/create', celebrate(communitySchems.create), upload.single("image"), createCommunity)
router.put('/:id', celebrate(communitySchems.id), upload.single("image"), celebrate(communitySchems.update), updateCommunity);
router.delete('/:id', celebrate(communitySchems.id), deleteCommunity);


module.exports = router;