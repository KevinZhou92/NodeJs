const express = require('express');

var app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
        name: 'Todo App v1.0'
    });
});

app.get('/users', (req, res) => {
    res.send([{
        name: 'Kevin Zhou',
        age: 25
    },
        {
        name: 'Angela Zhao',
        age: 25
        },
    ]);
})

app.listen(port, () => {
    console.log(`Start listening on ${port}.`);
});
module.exports.app = app;
