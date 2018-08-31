const express = require("express")
const actionDb = require("../data/helpers/actionModel.js")
const actionRouter = express.Router()

//MiddleWare

//Routes 
actionRouter.get('/', (req,res) => {
  actionDb
    .get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(error => {
      res.status(500).json({error, message: "Unable to obtain actions"})
    })
})


module.exports = actionRouter; 