const router = require('express').Router();
const {celebrate} = require('celebrate');
const userSchem = require("../validation/userSchems");
const { upload } = require('../middlewares/image')

const {getCurrentUser, getUser, updateUser, deleteUser} = require('../controllers/userController.js');

router.get('/:id', celebrate(userSchem.userId), getUser);
router.get('/',  getCurrentUser);
router.put('/',  upload.single("image"), celebrate(userSchem.update), updateUser);
router.delete('/',  deleteUser);


module.exports = router;