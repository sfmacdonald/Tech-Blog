const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/User', userRoutes);
router.use('/Post', postRoutes);
router.use('/Comment', commentRoutes);

module.exports = router;