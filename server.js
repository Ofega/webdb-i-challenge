const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

  
// Endpoints
server.route('/api/accounts')
    .get((req, res, next) => {
        const { limit, sortby, sortdir } = req.query;
        db("accounts").orderBy(sortby || 'id', sortdir || 'asc').limit(limit || 10000)
            .then(result => {
                res.status(200).json(result);
            })
            .catch((error) => {
                next(error)
            })
    })
    .post((req, res, next) => {
        const { name, budget } = req.body;
        db('accounts').insert({ name, budget })
            .then(result => {
                res.status(200).json(result);
            })
            .catch((error) => {
                next(error)
            })
    })


server.route('/api/accounts/:id')
    .get((req, res, next) => {
        const { id } = req.params;
        db('accounts').where({ id })
            .then(result => {
                res.status(200).json(result);
            })
            .catch((error) => {
                next(error)
            })
    })
    .put((req, res, next) => {
        const { id } = req.params;
        db('accounts').where({ id }).update({ name, budget })
            .then(result => {
                res.status(200).json(result);
            })
            .catch((error) => {
                next(error)
            })
    })
    .delete((req, res, next) => {
        const { id } = req.params;
        db('accounts').where({ id }).del()
            .then(result => {
                res.status(200).json(result);
            })
            .catch((error) => {
                next(error)
            })
    })


server.use((error, req, res) => {
    res.status(500).json({message: error.message})
})

module.exports = server;