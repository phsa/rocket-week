const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://phsa:phsa@phsa-cluster-68j5s.mongodb.net/rocket-week?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(express.json());
server.use(cors());

server.use(routes);
server.listen(8000);