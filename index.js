require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const app = express();
const blogRoutes = require('./routes/blog');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Adding Routes
app.use('/api', blogRoutes);
app.use('/', commentRoutes);
app.use('/', userRoutes);

app.listen(port, () => console.log("Server is running..."));
