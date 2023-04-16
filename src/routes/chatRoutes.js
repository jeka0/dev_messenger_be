const router = require('express').Router();
const {celebrate} = require('celebrate');
const chatSchems = require("../validation/chatSchems");
const { upload } = require('../middlewares/image')

const { createChat, getAllChats, deleteChat, updateChat, getChat, getChatByName } = require('../controllers/chatController.js');

router.get('/all', getAllChats);
router.get('/:id', celebrate(chatSchems.id), getChat);
router.post('/', celebrate(chatSchems.getByName), getChatByName);
router.post('/create', celebrate(chatSchems.create), upload.single("image"), createChat)
router.put('/:id', celebrate(chatSchems.id), upload.single("image"), celebrate(chatSchems.update), updateChat);
router.delete('/:id', celebrate(chatSchems.id), deleteChat);


module.exports = router;