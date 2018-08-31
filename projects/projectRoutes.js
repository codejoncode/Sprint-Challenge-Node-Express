const express = require("express")
const projectDb = require('../data/helpers/projectModel.js')
const projectRouter = express.Router(); 

projectRouter.get('/', (req, res) => {
    projectDb.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        res.status(500).json({error, message: "Unable to obtain projects"})
    })
})





module.exports = projectRouter; 