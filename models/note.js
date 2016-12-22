'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        ticketId: { type: String, required: true },
        subject: { type: String, required: true },
        body: { type: String, required: true },
        user: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false
    }
);

CommentSchema.pre('save', function(next) {
    const now = new Date();
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('comment', CommentSchema);