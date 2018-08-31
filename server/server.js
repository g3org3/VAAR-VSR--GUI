const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();
const url = `http://${process.env.APIHOST}:${process.env.APIPORT}/api`;

console.log(url);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => res.render('index'));
app.get('/api/run', (req, res) => {
  let response = {};
  return fetch(`${url}/run`)
    .then(r => {
      response = r;
      return response.text();
    })
    .then(text => {
      res.status(response.status);
      return res.send(text);
    })
    .catch(err => {
      res.status(err.statusCode || 500);
      res.send(err.message);
    });
});

app.get('/api/:endpoint', (req, res) => {
  const { endpoint } = req.params;
  console.log({ endpoint });
  let response = {};
  let isJSON = false;
  return fetch(`${url}/${endpoint}`)
    .then(r => {
      response = r;
      isJSON = r.headers.get('Content-Type') === 'application/json';
      return isJSON ? response.json() : response.text();
    })
    .then(text => {
      res.status(response.status);
      return isJSON ? res.json(text) : res.send(text);
    })
    .catch(err => {
      res.status(err.statusCode || 500);
      res.send(err.message);
    });
});

app.post('/api/:endpoint', (req, res) => {
  const { endpoint } = req.params;
  const { body } = req;
  let response = {};
  return fetch(`${url}/${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then(r => {
      response = r;
      return response.text();
    })
    .then(text => {
      res.status(response.status);
      return res.send(text);
    })
    .catch(err => {
      res.status(err.statusCode || 500);
      res.send(err.message);
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
