// used to create our local strategy for authenticating
// using username and password
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = function(passport) {

    // these two functions are used by passport to store information
    // in and retrieve data from sessions. We are using user's object id
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done) {
        User.findById(_id, function(err, user) {
            done(err, user);
        });
    });

    // strategy to login
    // this method only takes in username and password, and the field names
    // should match of those in the login form
    passport.use('local-login', new LocalStrategy({
            usernameField : 'emailAddress',
            passwordField : 'password',
            passReqToCallback : true}, // pass the req as the first arg to the callback for verification
        function(req, emailAddress, password, done) {
            process.nextTick(function() {
                // see if the user with the email exists
                User.findOne({ 'emailAddress' :  emailAddress }, function(err, user) {
                    // if there are errors, user is not found or password
                    // does match, send back errors
                    if (err) {
                        return done(err)

                    } else if (!user) {
                        console.log('User login failed:', emailAddress, 'NOT FOUND')
                        return done(null, false, req.flash('loginMessage', 'No user found.'))

                    } else if (!user.validPassword(password)) {
                        // false in done() indicates to the strategy that authentication has
                        // failed
                        console.log('User login failed:', emailAddress, 'WRONG PASSWORD')
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
                    }

                    // otherwise, we put the user's email in the session
                    else {
                        req.session.emailAddress = emailAddress;
                        console.log('User login successfully: ', emailAddress)
                        return done(null, user, req.flash('loginMessage', 'Login successful'))
                    }
                });
            });

        }));

    // for signup
    passport.use('local-signup', new LocalStrategy({
            usernameField : 'emailAddress',
            passwordField : 'password',
            passReqToCallback : true }, // pass the req as the first arg to the callback for verification

        function(req, emailAddress, password, done) {
            process.nextTick( function() {
                User.findOne({'emailAddress': emailAddress}, function(err, existingUser) {
                    // search a user by the username (email in our case)
                    // if user is not found or exists, exit with false indicating
                    // authentication failure
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    if (existingUser) {
                        console.log("Customer signup failed:", emailAddress, "ALREADY REGISTERED!");
                        return done(null, false, req.flash('signupMessage', 'This email address is already taken.'));
                    }
                    else {
                        // otherwise
                        // create a new user
                        let newUser = new User();
                        newUser.emailAddress = emailAddress;
                        newUser.password = newUser.generateHash(password);
                        newUser.familyName = req.body.familyName;
                        newUser.givenName = req.body.givenName;

                        // and save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });

                        // put the user's email in the session so that it can now be used for all
                        // communications between the client (browser) and the FoodBuddy app
                        req.session.emailAddress = emailAddress;
                        console.log('User signed up and logged in successfully:', emailAddress)
                    }
                });
            });
        }));
}