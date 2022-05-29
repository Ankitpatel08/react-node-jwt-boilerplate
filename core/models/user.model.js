const jwt = require('jsonwebtoken');
const db = require('../config/db');

module.exports = class User {
    constructor(firstName, lastName, emailId, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId.toLowerCase();
        this.password = password;
        this.token = jwt.sign({emailId: this.emailId}, process.env.TOKEN_KEY, {expiresIn: '2h'});
    }

    save() {
        return db.execute('INSERT INTO users (firstName, lastName, emailId, password, jwtToken) VALUES (?, ?, ?, ?, ?)', [this.firstName, this.lastName, this.emailId, this.password, this.token]);
    }

    static getUserbyemailId(emailId) {
        return db.execute('SELECT * FROM users WHERE emailId = (?)', [emailId]);
    }
}