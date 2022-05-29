const User = require("../models/user.model");

exports.userDetails = (req, res, next) => {
    const { emailId } = req.body;

    try {
        User.getUserbyemailId(emailId).then(([user]) => {
            res.status(200).send(user[0]);
        }).catch(err => console.log(err));
    } catch(err) {
        console.log('error');
    }
}