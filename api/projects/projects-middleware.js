const Project = require('../projects/projects-model')

function validateProj(req, res, next) {
    const { name, description, completed } = req.body
    if(!name || !description || completed === undefined ) {
        res.status(400).json({
            message: "Project name and description have not been completed"
        })
    }else {
        next();
    }
}

function validateProjId(req, res, next) {
    const { id } = req.params;
    Project.get(id)
        .then(project => {
           if(project) {
            req.project = project;
            next();
           } else {
               res.status(404).json({
                   message: "Project not found"
               });
           }
        })
        .catch(next)
}

module.exports = { validateProjId, validateProj }