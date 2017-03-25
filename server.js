const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(`${now}: ${req.method} ${req.url}`);

	fs.appendFile('server.log', log+'\n');

	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'this'
	})
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Welcome to my home pages!'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		"error": "500 Bad request"
	});
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});