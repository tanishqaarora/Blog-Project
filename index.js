require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const app = express();
const blogCategoryRoutes = require('./routes/blogCategory');
const reactionCategoryRoutes = require('./routes/reactionCategory');
const blogRoutes = require('./routes/blog');
const reactionRoutes = require('./routes/reaction');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');
const dashboardRoute = require('./utils/dashboard');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Adding Routes
app.use('/', blogCategoryRoutes);
app.use('/', reactionCategoryRoutes);
app.use('/api', blogRoutes);
app.use('/', reactionRoutes);
app.use('/', commentRoutes);
app.use('/', userRoutes);
app.use('/', dashboardRoute);

app.listen(port, () => console.log("Server is running..."));
