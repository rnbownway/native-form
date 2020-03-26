const express = require('express');

const app = express();

const DEFAULT_PORT = 3000

const argv = process.argv.slice(2)
const argPort = argv.find(arg => arg.includes('port'))
const port = argPort ? Number(argPort.slice(argPort.indexOf('=') + 1)) : DEFAULT_PORT

app.use(express.static('src'));

app.get('/', function(req, res) {
  res.redirect('index.html');
});

app.listen(port);

console.log('Server started at http://localhost:' + String(port));
