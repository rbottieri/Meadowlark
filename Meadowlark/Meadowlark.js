
/**
 * Module dependencies.
 */

var express = require('express'),
    exphbs = require('express-handlebars');

var fortune = require('./lib/fortune.js');

var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// all environments
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
    next();
});

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
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

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Crtl C to terminate');
});




//app.get('/', routes.index);
//app.get('/users', user.list);

//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});
