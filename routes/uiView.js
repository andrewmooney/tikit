'use strict';

const mongoose = require('mongoose');
const ticket = require('../models/ticket');
const comment = require('../models/comment');

// ui routes
const viewTickets = (req, res) => {
    let query = ticket.find({}, (err, tickets) => {
        if (err) res.send(err);

        comment.find({ticketId: req.params.tid}, (err, comments) => {
            if (err) res.send(err);
            tickets.comments = comments;
            
            console.log(tickets);
            res.render('tickets/tickets', {tickets: tickets});
        })
    })
}

const viewTicket = (req, res) => {
    ticket.findById(req.params.id, (err, ticket) => {
        if (err) res.send(err);
        comment.find({ticketId: req.params.id}).sort({createdAt: -1}).exec((err, comments) => {
            if (err) res.send(err);

            ticket.comments = comments;
            
        console.log(ticket);
        res.render('ticket/ticket', {ticket: ticket});
        })
    })
}

module.exports = { viewTickets, viewTicket };