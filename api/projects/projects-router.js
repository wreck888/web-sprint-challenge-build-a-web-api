const express = require('express')

const Project = require('./projects-model');

const { validateProj, validateProjId } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({
            message: 'ERROR RETRIEVING POST'
        })
    })
})

router.get('/:id', validateProjId, (req, res, next) => {
    res.status(200).json(req.project)
})

router.post('/', validateProj, (req, res, next) => {
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(error => {
            res.status(500).json({
                message: 'ERROR ADDING NEW POST'
            })
        })
})

router.put('/:id', validateProjId, validateProj, (req, res, next) => {
    Project.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({
            message: 'ERROR UPDATING PROJECT'
        })
    })
})

router.delete('/:id', validateProjId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(project => {
            res.status(200).json(req.project)
        })
        .catch(error => {
            res.status(500).json({
                message: 'ERROR DELETING PROJECT'
            })
        })
})


router.get('/:id/actions', validateProjId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({
                message: 'ERROR GETTING ACTION'
            })
        })
})

module.exports = router;