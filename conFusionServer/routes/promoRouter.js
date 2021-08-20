const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Promotions = require('../models/promotions')

const promoRouter = express.Router()

promoRouter.use(bodyParser.json())

promoRouter.route('/(:promoId)?')

.all((req, res, next) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	next()
})

.get(cors.cors, (req,res,next) => {
	if(req.params.promoId){
		Promotions.find(req.query)
		.then((promotion) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(promotion)
		}, (err) => next(err))
		.catch((err) => next(err))
		return
	}
	Promotions.find({})
	.then((promotions) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(promotions);
	}, (err) => next(err))
	.catch((err) => next(err))
})
.post((req, res, next) => {
	if(req.params.promoId){
		res.statusCode = 403
		res.end('POST operation not supported on /promotions/' + req.params.promoId)
		return
	}
	Promotions.create(req.body)
	.then((promotion) => {
		console.log('Promotion Created', promotion);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(promotion);
	}, (err) => next(err))
	.catch((err) => next(err))
})
.put((req, res, next) => {
	if(req.params.promoId){
		Promotions.findByIdAndUpdate(req.params.promoId, {
			$set: req.body
		}, { new: true })
		.then((promotion) => {
			console.log('Promotion Updated', promotion);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(promotion);
		}, (err) => next(err))
		.catch((err) => next(err))
		return
	}
	res.statusCode = 403
	res.end('PUT operation bot supported on promotions')
})
.delete((req, res, next) => {
	if(req.params.promoId){
		Promotions.findByIdAndRemove(req.params.promoId)
		.then((resp) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(resp);
		}, (err) => next(err))
		.catch((err) => next(err))
		return
	}
	Promotions.remove({})
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err))
});


module.exports = promoRouter