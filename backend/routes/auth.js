const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

router.post('/register', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'User exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });

    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ user: { id: user._id, email: user.email } });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info?.message || 'Login failed' });

    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ user: { id: user._id, email: user.email } });
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    req.session.destroy(() => res.json({ ok: true }));
  });
});

router.get('/me', (req, res) => {
  if (!req.user) return res.json({ user: null });
  res.json({ user: { id: req.user._id, email: req.user.email } });
});

module.exports = router;
