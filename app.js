const express = require('express');
const authRoute = require('./route/auth.route.js');
const userRoute = require('./route/user.route.js');
const roleRoute = require('./route/role.route.js');
const app = express();

app.use(express.json());

app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use('/role',roleRoute);

module.exports = app;