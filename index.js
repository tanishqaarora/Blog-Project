require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const app = express();
const blogRoutes = require('./routes/blog');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Blog Routes
app.use('/api', blogRoutes);

app.listen(port, () => console.log("Server is running..."));
