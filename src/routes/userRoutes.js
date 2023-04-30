const router = require('express').Router();
const {celebrate} = require('celebrate');
const userSchem = require("../validation/userSchems");
const { getByName } = require("../validation/chatSchems") 
const { upload } = require('../middlewares/image')

const {getAllUsers, getCurrentUser, getUser, updateUser, deleteUser, searchUser} = require('../controllers/userController.js');

router.get('/all', getAllUsers);
router.get('/:id', celebrate(userSchem.userId), getUser);
router.get('/',  getCurrentUser);
router.post('/search', celebrate(getByName), searchUser);
router.put('/',  upload.single("image"), celebrate(userSchem.update), updateUser);
router.delete('/',  deleteUser);


module.exports = router;