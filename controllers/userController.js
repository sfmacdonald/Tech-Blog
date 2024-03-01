const bcrypt = require('bcrypt');
const { User } = require('../models');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// User login
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        res.status(400).json({ message: 'Incorrect email or password' });
        return;
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect email or password' });
        return;
      }
  
      req.session.save(() => {
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;
  
        res.json({ user: user, message: 'You are now logged in!' });
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  // User logout
exports.logout = (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  };
  