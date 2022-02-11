const express = require('express')

const Action = require('./actions-model');

const { validateActions, validateActionsId } = require('./actions-middlware');
const { validateProjId } = require('../projects/projects-middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
    Action.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({
            message: 'ERROR RETRIEVING POST'
        })
    })
})

router.get('/:id', validateActionsId, (req, res, next) => {
    res.status(200).json(req.action)
})

router.post('/', validateActions, (req, res, next) => {
    Action.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction);
        })
        .catch(error => {
            res.status(500).json({
                message: 'ERROR ADDING NEW POST'
            })
        })
})

router.put('/:id', validateActionsId, validateActions, (req, res, next) => {
    Action.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({
            message: 'ERROR UPDATING PROJECT'
        })
    })
})

router.delete('/:id', validateActionsId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(action => {
            res.status(200).json(req.action)
        })
        .catch(error => {
            res.status(500).json({
                message: 'ERROR DELETING PROJECT'
            })
        })
})

module.exports = router;