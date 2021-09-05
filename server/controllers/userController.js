require('dotenv').config();    // for JWT password key
const User = require('../models/user');
const mongoose = require('mongoose');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { validatePassword } = require('../routes/utility')


const signup = (req, res) => {
    User.findOne({ emailAddress: req.body.emailAddress })
        .then((user) => {
            if (user) {
                return res.status(400).json({ msg: "Email already registered!" });
            }
            //else if (!validatePassword(req.body.password)) {
            //    res.status(400).json({ code: -1, msg: "Password must be longer than 8 characters!" });
            //}
            let newUser = new User();
            newUser.emailAddress = req.body.emailAddress;
            newUser.password = newUser.generateHash(req.body.password);
            newUser.familyName = req.body.familyName;
            newUser.givenName = req.body.givenName;

            newUser.save((err, data) => {
                if (err) {
                    return res.status(409).json({ msg: err });
                }
            })
            req.login(newUser, { session: false }, async (error) => {
                if (error) return res.status(500).json({ msg: error });

                // We don't want to store sensitive information such as the
                // user password in the token so we pick only the user's email
                const body = { _id: newUser.emailAddress };

                //Sign the JWT token and populate the payload with the user email
                const token = jwt.sign({ body }, process.env.PASSPORT_KEY);

                //Send back the token to the client

                // send the token
                res.cookie('jwt', token, { httpOnly: false, sameSite: false, secure: true });
                res.cookie('_id');
                const data = { _id: newUser.id };
                res.status(200).json({ data: data, token: token});
            });
        }).catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: err })
    })
};

const login = async(req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            // if there were errors during executing the strategy
            // or the user was not found, we display and error
            if(err) {
                return res.status(500).json({ msg: err })
            } else if (!user) {
                return res.status(500).json({ msg: 'No user found' })
            }

            req.login(user, { session : false }, async (error) => {
                if( error ) return next(error);
                const body = { _id : user.emailAddress };
                //Sign the JWT token and populate the payload with the user email
                const token = jwt.sign({ body },process.env.PASSPORT_KEY);
                //Send back the token to the client
                res.cookie('jwt', token, { httpOnly: false, sameSite: false, secure: true });
                res.cookie('_id', user.id, { maxAge: 30 * 24 * 60 * 60 * 1000 });
                const data = { _id: user.id };
                return res.status(200).json({ data: data, token: token });
            });
        } catch (err) {
            return res.status(500).json({ msg: err });
        }
    })(req, res, next)
}

const updateProfile = async(req, res) => {

    const userId = req.params.userid;
    try {
        let user = await User.findOne({ _id: userid })
        let givenName = req.body.givenName;
        let familyName = req.body.familyName;
        let emailAdress = req.body.emailAddress;
        let password = req.body.password;

        // udpate the information that User has changed
        if (givenName){
            await User.updateOne({ _id: userId }, { $set: { givenName: givenname } })
        }
        if (familyName){
            await User.updateOne({ _id: userId }, { $set: { familyName: familyname } })
        }
        if (emailAdress){
            await User.updateOne({ _id: userId }, { $set: { emailAddress: emailadress } })
        }
        if (password){
            if (!validatePassword(password)) {
                  return res.status(400).json({ code: -1, msg: "Password must be longer than 8 characters!" });
            }
            await User.updateOne({ _id: userId }, { $set: { password: User.generateHash(req.body.password) } })
    
        }
        
        // get User after updating
        user = await User.findOne({ _id: userId }, { givenName: true, familyName: true, emailAddress: true }).lean()

        if (user) {
            console.log("update profile sucessfully")
            res.status(200).send(user)
        } else {
            console.log('User not found')
            res.status(409).send("User not found")
        }
    } catch (err) {
        res.status(500).json({msg:err})
    }
}

const getUserInfo = async(req, res) => {
    let userId = req.cookies['_id'];
    console.log('getUserInfo:', userId);
    try {
        let result = await User.findOne({ _id: userId }, { givenName: true, familyName: true, emailAddress: true }).lean();
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err });
    }
}

module.exports={ signup, login, getUserInfo, updateProfile }