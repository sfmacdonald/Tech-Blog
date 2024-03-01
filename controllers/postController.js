// controllers/postController.js
const { Post, User } = require('../models');

const getHomePage = async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('home', { posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error fetching posts');
    }
};

module.exports = {
    getHomePage,
};
