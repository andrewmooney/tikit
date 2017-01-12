'use strict';
const request = require('request');

/* 
    Checks to see if the post subject contains a reference id
    if so it forwards the post to the ticket route, otherwise it forwards it to the comments route 
*/

exports.existingTicket = (req, res) => {
    const content = req.body;
    const id = content.subject.includes('[') ? content.subject.match(/\[(.*)\]/).pop() : null;
    const url = 'http://localhost:3000';

    if (id) {
        // Forward post to /comment
        console.log('Forwarding to comment');
        content.ticketId = id;
        req.body.ticketId = id;

        console.log("Main content", req.body);

        request({
            url: url + '/comment',
            method: "POST",
            json: req.body,
        }, (err, remRes, remBody) => {
            if (err) return res.status(500).end('Error');
            res.writeHead(JSON.stringify(remRes));
            res.end(JSON.stringify(remBody));
        });
    } else {
        // Forward post to /ticket
        console.log('Forwarding to ticket')
        request.post({ url: `${url}/ticket`, req }, (err, remRes, remBody) => {
            if (err) return res.status(500).end('Error');
            res.writeHead(JSON.stringify(remRes));
            res.end(JSON.stringify(remBody));
        });
    }
}