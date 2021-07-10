const express = require('express')
const bodyParser = require('body-parser')

const dishRouter = express.Router()

dishRouter.use(bodyParser.json())

dishRouter.route('/(:dishID)?')

.all((req, res, next) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	next()
})

.get((req, res, next) => {
	if(req.params.dishID){
		res.end("Will send the details of the dish: " + req.params.dishID + " to you!")
		return
	}
	res.end("Will send all the dishes to you!")
})
.post((req, res, next) => {
	if(req.params.dishID){
		res.statusCode = 403
		res.end('POST operation not supported on /dishes/' + req.params.dishID)
		return
	}
	res.end('Will add the dish ' + req.body.name + 
			' with details: ' + req.body.description)
})
.put((req, res, next) => {
	if(req.params.dishID){
		res.write('Updating their dish: ' + req.params.dishID)
		res.end('\nWill update their dish: ' + req.body.name + " with details " + req.body.description )
		return
	}
	res.statusCode = 403
	res.end('PUT operation bot supported on dishes')
})
.delete((req, res, next) => {
	if(req.params.dishID){
		res.end("Deleting dish: " + req.params.dishID)
		return
	}
	res.end("Deleting all the dishes")
});


module.exports = dishRouter
