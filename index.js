'use strict';

// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');

// Config
const config = require('./config');

// Import UI Routes
const ticketView = require('./routes/uiView');

// Import API routes
const ticket = require('./routes/tickets');
const comment = require('./routes/comments');
const user = require('./routes/users');
const main = require('./routes/main');

//db
const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } }
}
mongoose.connect(config.DBHost, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

// Ticket View routes
app.route("/tickets")
    .get(ticketView.viewTickets);

app.route("/ticket/:id")
    .get(ticketView.viewTicket);

// Ticket API routes
app.route("/api/ticket")
    .get(ticket.getTickets)
    .post(ticket.postTicket);

app.route("/api/ticket/:id")
    .get(ticket.getTicket)
    .delete(ticket.deleteTicket)
    .put(ticket.updateTicket);

// Comment routes
app.route("/api/comment")
    .get(comment.getComments)
    .post(comment.postComment);

app.route("/api/comment/:id")
    .get(comment.getComment)
    .delete(comment.deleteComment)
    .put(comment.updateComment);

// User routes
app.route("/api/user")
    .get(user.getUsers)
    .post(user.postUser);

app.route("/api/user/:id")
    .get(user.getUser)
    .delete(user.deleteUser)
    .put(user.updateUser);

app.route("/api")
    .post(main.existingTicket);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

module.exports = app;