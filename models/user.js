'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bcrypt = require('bcrypt');
const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false
    }
);

UserSchema.pre('save', function(next) {
    const now = new Date();
    if(!this.createdAt) {
        this.createdAt = now;
    }

    Bcrypt.genSalt(10, (err, salt) => {
        if (err) console.log(err);

        Bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) console.log(err);
            console.log(hash);
            this.password = hash;
            next();
        });
    })
});

module.exports = mongoose.model('user', UserSchema);