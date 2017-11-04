const express = require('express');


var app = express();


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/about', (req, res) => {
    res.send({
        name: 'Kevin',
        likes: [
            'Guitar',
            'Rock'
        ]
    });
});

app.listen(8080, () => {
    console.log('Starting listening on 8080...');
});
