const prpl = require('prpl-server');
const express = require('express');

const app = express()

app.get('/api/launch', (req, res, next) => res.send('boom'));

app.get('/*', prpl.makeHandler('.', {
  builds: [
    {name: '.', browserCapabilities: ['es2015', 'push']},
    {name: '.'},
  ],
}));

app.listen(8080);