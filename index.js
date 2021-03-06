const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.render('index');
});