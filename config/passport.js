// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/auth'); // Assuming you have a jwtSecret in your config

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback",
    passReqToCallback: true // Add this line
  },
  async (req, token, tokenSecret, profile, done) => { // Add req as the first argument
    console.log('GoogleStrategy callback executed');
    try {
      let user = await User.findOne({ googleId: profile.id });
      console.log('User lookup:', user);

      if (!user) {
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          role: 'user'
        });
        await user.save();
        console.log('New user created:', user);
      }

      // Generate JWT token
      const payload = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      };

      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
      user.token = token;

      console.log('Generated JWT token:', token);

      return done(null, user);
    } catch (err) {
      console.error('Error in GoogleStrategy:', err);
      return done(err, false);
    }
  }
));

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => { // Change to async function
  console.log('Deserializing user with id:', id);
  try {
    const user = await User.findById(id); // Use promise-based syntax
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
