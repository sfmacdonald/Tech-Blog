// Import the express Router and User model
const router = require('express').Router();
const { User } = require('../../models');

// POST route for user registration
// Creates a new user with the provided user_name, email, and password
// Returns the created user data with a 200 status code on success
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
        }, {
            individualHooks: true,
            returning: true,
        });
        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

// POST route for user login
// Finds a user with the provided email
// Checks if the provided password is valid for the found user
// If login is successful, sets the session user_id and logged_in properties
// Returns the user data and a success message with a 200 status code on success
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
               .status(400)
               .json({ message: 'Incorrect email or password, try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
               .status(400)
               .json({ message: 'Incorrect password, try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' })
        });

    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

// POST route for user logout
// Destroys the session if the user is logged in
// Returns a 204 status code on success
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Export the router
module.exports = router;