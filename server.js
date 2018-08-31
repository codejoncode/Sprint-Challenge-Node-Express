const express = require("express");
const server = express();
const PORT = 9000; 
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const projectRouter = require('./projects/projectRoutes.js')

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(morgan('dev'))

server.use('/api/projects', projectRouter)

server.listen(PORT, () => console.log(`\n== API on port ${PORT}==\n`))