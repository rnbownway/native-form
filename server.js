const express = require('express');

const app = express();

app.use(express.static('src'));

app.get('/', function(req, res) {
  res.redirect('index.html');
});

app.listen(8080);

console.log('hello there');
