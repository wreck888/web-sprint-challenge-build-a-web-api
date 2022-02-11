// add middlewares here related to actions
const Action = require('./actions-model')

function validateActions(req, res, next) {
    const { project_id, description, notes, completed} = req.body
    if (!description || !notes || completed === undefined ) {
        res.status(400).json({
            message: "Action description and notes have not been completed"
        })
    } else if (!project_id) {
        res.status(400).json({
            message: `Project was not found. Please enter a correct project ID`
        })
    }else {
        next();
    }
}

function validateActionsId(req, res, next) {
    const { id } = req.params;
    Action.get(id)
        .then(action => {
           if(action) {
            req.action = action;
            next();
           } else {
               res.status(404).json({
                   message: "Action not found"
               });
           }
        })
        .catch(next)
}

module.exports = {  validateActionsId, validateActions }