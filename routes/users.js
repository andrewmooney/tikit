'use strict';

const mongoose = require('mongoose');
const User = require('../models/user');

const getUsers = (req, res) => {
    let query = User.find({});
    query.exec((err, users) => {
        if(err) res.send(err);

        res.json(users);
    });
}

const getUser = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) res.send(err);

        res.json(user);
    })
}

const postUser = (req, res) => {
    const newUser = new User(req.body);
    
    newUser.save((err, user) => {
        if(err) {
            res.send(err);
        } else {
            res.json({notification: "User successfully added!", user});
        } 
    });
}

const deleteUser = (req, res) => {
    User.remove({_id: req.params.id}, (err, result) => {
        res.json({ notification: "User succesfully deleted!", result });
    });
}

const updateUser = (req, res) =>{
    User.findById({_id: req.params.id}, (err, user) => {
        if(err) res.send(err);

        Object.assign(user, req.body).save((err, user) => {
            if(err) res.send(err);
            res.json({ message: "User updated!", user});
        });
    });
}

module.exports = { getUsers, getUser, postUser, deleteUser, updateUser };