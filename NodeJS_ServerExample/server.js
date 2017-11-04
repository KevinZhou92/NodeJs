const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

// this will return an instance of a web server
var app = express();

// set the template engine as hbs
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.use((req, res, next) => {
    var time = new Date();
    var logMessage = `${time}: ${req.method} ${req.url} `;
    console.log(logMessage);
    fs.appendFile('server.log', logMessage + '\n', (error) => {
        if (error) {
            console.log('Unable to append log file!');
        }
    });
    next();
});
// server the static page
app.use(express.static(__dirname + '/public'));

// maintenance use
// app.use((req, res, next) => {
//     res.render('maintenance')
// });

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page',
        welcomeMessage: 'About my website.'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        Error: 'Unable to fetch data!'
    });
});
// activate the app to listen on port 8080 of local machine
app.listen(8080, () => {
    console.log('Starting listening on 8080...');
});