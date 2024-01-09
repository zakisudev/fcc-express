require('dotenv').config();
const bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

console.log('Hello World');

absolutePath = __dirname + '/views/index.html';

app.get('/', (req, res) => {
  res.sendFile(absolutePath);
});

app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time,
    });
  }
);

app.get('/:word/echo', (req, res) => {
  res.send({
    echo: req.params.word,
  });
});

app
  .route('/name')
  .get((req, res) => {
    res.send({
      name: `${req.query.first} ${req.query.last}`,
    });
  })
  .post((req, res) => {
    res.send({
      name: `${req.body.first} ${req.body.last}`,
    });
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
