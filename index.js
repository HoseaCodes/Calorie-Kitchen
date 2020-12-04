const express = require('express');
const app = express();
require('dotenv').config();
console.log(process.env)
app.listen(3000, () => console.log('Listening on port 3000'));
app.use(express.static('public'));