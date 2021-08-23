const salesmanService = require('../services/salesman.service')

class SalesmanController {
    async findRoute(req, res, next) {
        try {
            const {points} = req.body
            const response = await salesmanService.solve(points)

            return res.json(response)
        } catch (e) {
            console.log(e)
        }
    }
}


module.exports = new SalesmanController()