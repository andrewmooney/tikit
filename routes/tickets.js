'use strict';

const mongoose = require('mongoose');
const Ticket = require('../models/ticket');

const getTickets = (req, res) => {
    let query = Ticket.find({});
    query.exec((err, tickets) => {
        if(err) res.send(err);

        res.json(tickets);
    });
}

const getTicket = (req, res) => {
    Ticket.findById(req.params.id, (err, ticket) => {
        if (err) res.send(err);

        res.json(ticket);
    })
}

const postTicket = (req, res) => {
    const newTicket = new Ticket(req.body);

    newTicket.save((err, ticket) => {
        if(err) {
            res.send(err);
        } else {
            res.json({notification: "Ticket successfully added!", ticket});
        } 
    });
}

const deleteTicket = (req, res) => {
    Ticket.remove({_id: req.params.id}, (err, result) => {
        res.json({ notification: "Ticket succesfully deleted!", result });
    });
}

const updateTicket = (req, res) =>{
    Ticket.findById({_id: req.params.id}, (err, ticket) => {
        if(err) res.send(err);

        Object.assign(ticket, req.body).save((err, ticket) => {
            if(err) res.send(err);
            res.json({ message: "Ticket updated!", ticket});
        });
    });
}

module.exports = { getTickets, getTicket, postTicket, deleteTicket, updateTicket };