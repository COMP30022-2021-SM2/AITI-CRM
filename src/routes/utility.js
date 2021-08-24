/*
This file stores some helpful middleware functions :)
*/

exports.isLoggedIn = function(req, res, next) {
    // if logged in then next
    if (req.isAuthenticated()) {
        return next()
    }
    console.log('login first')
    res.redirect('/login')
}

exports.isNotLoggedIn = function(req, res, next) {
    // if logged in then go to main page
    if (req.isAuthenticated()) {
        console.log('already logged in')
        return res.redirect('/')
    }
    next()
}