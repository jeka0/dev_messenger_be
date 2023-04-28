const router = require('express').Router();
const {celebrate} = require('celebrate');
const chatSchems = require("../validation/chatSchems");
const { upload } = require('../middlewares/image')

const { createChat, getAllChats, deleteChat, updateChat, getChat, getChatByName, joinUser, leaveUser } = require('../controllers/chatController.js');

router.get('/all', getAllChats);
router.get('/:id', celebrate(chatSchems.id), getChat);
router.post('/join/:id', celebrate(chatSchems.id), joinUser);
router.post('/leave/:id', celebrate(chatSchems.id), leaveUser);
router.post('/', celebrate(chatSchems.getByName), getChatByName);
router.post('/create', upload.single("image"), celebrate(chatSchems.create), createChat)
router.put('/:id', celebrate(chatSchems.id), upload.single("image"), celebrate(chatSchems.update), updateChat);
router.delete('/:id', celebrate(chatSchems.id), deleteChat);


module.exports = router;