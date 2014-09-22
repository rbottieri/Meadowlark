
/**
 * Module dependencies.
 */

var express = require('express'),
    exphbs = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//var routes = require('./routes');
//var user = require('./routes/user');
//var http = require('http');
//var path = require('path');

//var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(app.router); 
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/About', function (req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
});

//. custom 404 page)
app.use(function (req, res) {
    //res.type('text/plain');
    res.status(404);
    res.render('404');
});

//. custom 500 page
app.use(function (err, req, res, status) {
    console.error(err.stack);
    //res.type('text/plain');
    res.status(500);
    res.render('500');
});

var fortunes = [
"Conquer your fears or they will conquer you.",
"Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.",
"Whenever possible, keep it simple.",
];

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Crtl C to terminate');
});




//app.get('/', routes.index);
//app.get('/users', user.list);

//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});
