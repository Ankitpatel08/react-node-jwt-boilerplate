const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');    
const User = require("../models/user.model");

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, emailId, password } = req.body;

        if(!(firstName && lastName && emailId && password)) {
            res.status(400).send('input missing');
        }

        User.getUserbyemailId(emailId).then(([data]) => {
            if (data.length > 0) {
                res.status(409).send('user already exist');
            }
        }).catch(err => console.log(err));

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = new User(firstName, lastName, emailId, encryptedPassword);
        user.save().then(([result]) => {
            res.status(200).send(result);
        }).catch(err => console.log(err));

    } catch(err) {
        console.log(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        const {emailId, password} = req.body;

        if(!(emailId && password)) {
            res.status(400).send('missing input');
        }

        User.getUserbyemailId(emailId).then(async ([user]) => {
            if(user[0] && (await bcrypt.compare(password, user[0].password))) {
                const token = jwt.sign({emailId: emailId},
                    process.env.TOKEN_KEY,
                    {expiresIn: '2h'});

                user[0].jwtToken = token;

                res.status(200).send(user[0]);
            } else {
                res.status(400).send('invalid credentials');
            }
        }).catch(err => console.log(err));
    } catch(err) {
        console.log(err);
    }
}