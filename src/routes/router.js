const router = require('express').Router();
const express = require('express');
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const communityRoutes = require("./communityRoutes");
const checkAuth = require('../middlewares/checkAuth.js');

router.use('/image', express.static('Images'));
router.use('/auth', authRoutes);
router.use('/user', checkAuth, userRoutes);
router.use('/post', checkAuth, postRoutes);
router.use('/community', checkAuth, communityRoutes);
module.exports = router;