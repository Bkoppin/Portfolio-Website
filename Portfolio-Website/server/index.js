const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');

const app = express();
app.use(bodyParser.json());


const PORT = process.env.PORT || 3040;

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});