const Router = require('express').Router
const router = new Router()
const salesmanController = require('../controllers/salesman.controller')


router.post('/routes', salesmanController.findRoute)


module.exports = router