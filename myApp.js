require('dotenv').config();
let express = require('express');
let app = express();

console.log('Hello World');

absolutePath = __dirname + '/views/index.html';

app.get('/', (req, res) => {
  res.sendFile(absolutePath);
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
  let message = 'Hello json';
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }
  res.json({ message });
});

module.exports = app;
