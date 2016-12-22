'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

// Import routes
const ticket = require('./routes/tickets');
const comment = require('./routes/comments');
const user = require('./routes/users');
const main = require('./routes/main');

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

// Ticket routes
app.route("/ticket")
    .get(ticket.getTickets)
    .post(ticket.postTicket);

app.route("/ticket/:id")
    .get(ticket.getTicket)
    .delete(ticket.deleteTicket)
    .put(ticket.updateTicket);

// Comment routes
app.route("/comment")
    .get(comment.getComments)
    .post(comment.postComment);

app.route("/comment/:id")
    .get(comment.getComment)
    .delete(comment.deleteComment)
    .put(comment.updateComment);

// User routes
app.route("/user")
    .get(user.getUsers)
    .post(user.postUser);

app.route("/user/:id")
    .get(user.getUser)
    .delete(user.deleteUser)
    .put(user.updateUser);

app.route("/")
    .post(main.existingTicket);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

module.exports = app;