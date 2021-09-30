const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const { db, Page, User } = require('./models');
const layout = require('./views/layout')

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.get('/', (req, res) => {
    res.send(layout(''))
})
db.authenticate().then(() => {
    console.log('connected to the database')
})

const thingy = async() => {
    await db.sync({ force: true });
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Running at http://localhost:${PORT}`)
    });
}

thingy();