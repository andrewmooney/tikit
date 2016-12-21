'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema(
    {
        subject: { type: String, required: true },
        body: { type: String, required: true },
        user: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false
    }
);

TicketSchema.pre('save', (next) => {
    const now = new Date();
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('ticket', TicketSchema);