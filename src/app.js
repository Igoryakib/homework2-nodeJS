const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require('./routes/contactsRouter');

const app = express();
app.use(express.json());
app.use(volleyball);
app.use(cors({
    origin: '*',
}));

app.use('/api/contacts', contactsRouter);

module.exports = app;
