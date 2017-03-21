var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.locals.pagetitle = "Jesse Lopez";

app.get('/',function(req, res)
{
	res.render('default', {
		title: 'Home',
		classname: 'home'
	});
});

app.get('/about',function(req, res)
{
	res.render('default', {
		title: 'About us',
		classname: 'about'
	});
});

app.get('*',function(req, res)
{
	var name = req.params.name;
	var title = req.params.title;
	res.send('<H1> Bad Route </H1>');
});

var server = app.listen(3000,function() 
{
	console.log('Listening on port 3000');
});