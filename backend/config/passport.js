const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "No account associated with this email" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    console.log('[SERIALIZE] Serializing user:', user._id);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      console.log('[DESERIALIZE] Deserializing user ID:', id);
      const user = await User.findById(id).select("-password");
      console.log('[DESERIALIZE] Found user:', user ? user.email : 'NOT FOUND');
      done(null, user);
    } catch (err) {
      console.error('[DESERIALIZE] Error:', err.message);
      done(err);
    }
  });
};
