const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
let stringify;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send("Let's start");
});

app.get('/getNote', function(req, res) {
	fs.readFile('./data.json', 'UTF8', function(err, data) {
		if (err) throw err;
		res.send(data);
	});
});

app.post('/updateNote/:note', function(req, res) {
	stringify = {
		'update element': req.params.note,
	};
	let jsonElement = JSON.stringify(stringify, null, 4);

	fs.appendFile('./data.json', jsonElement + '\n', function(err) {
		if (err) throw err;
		res.send(`New element: ${jsonElement}`);
	});
});

app.use(function(req, res, next) {
	res.status(404).send('Something gone wrong');
});

app.listen(3000);
