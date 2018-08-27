const express = require('express');
const userRouter = require('./userRouter');

const app = express();

app.use(userRouter);

module.exports = app;