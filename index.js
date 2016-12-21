'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const ticket = require('./routes/tickets');

//db
const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 }},
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 }}
}
mongoose.connect(config.DBHost, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.route("/ticket")
    .get(ticket.getTickets)
    .post(ticket.postTicket);

app.route("/ticket/:id")
    .get(ticket.getTicket)
    .delete(ticket.deleteTicket)
    .put(ticket.updateTicket);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

module.exports = app;