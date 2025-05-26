const express = require('express');
const authRoute = require('./route/auth.route.js');
const userRoute = require('./route/user.route.js');
const roleRoute = require('./route/role.route.js');
const app = express();
const {limiter} = require('./middleware/rate-limit.middleware.js');
const { log } = require('./middleware/log.middleware.js');

app.use(express.json());

app.use(log);

app.use('/auth',limiter(1,5),authRoute);
app.use('/user',limiter(15,500),userRoute);
app.use('/role',limiter(15,500),roleRoute);

module.exports = app;