'use strict';

const mongoose = require('mongoose');
const Comment = require('../models/comment');

const getComments = (req, res) => {
    let query = Comment.find({});
    query.exec((err, comments) => {
        if(err) res.send(err);

        res.json(comments);
    });
}

const getComment = (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) res.send(err);

        res.json(comment);
    })
}

const getTicketComments = (req, res) => {
    Comment.find({ticketId: req.params.tid}, (err, comments) => {
        if (err) res.send(err);

        res.json(comments);
    })
}

const postComment = (req, res) => {
    console.log("Comment content: ", req.body);
    const newComment = new Comment(req.body);
    console.log('Arrived at comment');
    newComment.save((err, comment) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500).send(err);
        } else {
            console.log("YAYYYY!!");
            return res.json({notification: "Comment successfully added!", comment});
        } 
    });
}

const deleteComment = (req, res) => {
    Comment.remove({_id: req.params.id}, (err, result) => {
        res.json({ notification: "Comment succesfully deleted!", result });
    });
}

const updateComment = (req, res) =>{
    Comment.findById({_id: req.params.id}, (err, comment) => {
        if(err) res.send(err);

        Object.assign(comment, req.body).save((err, comment) => {
            if(err) res.send(err);
            res.json({ message: "Comment updated!", comment});
        });
    });
}

module.exports = { getComments, getComment, postComment, deleteComment, updateComment };