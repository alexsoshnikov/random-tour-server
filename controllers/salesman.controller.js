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

//: todo example data
// [[55.75371, 37.61988],
//     [55.75252, 37.62308],
//     [55.744525, 37.605281],
//     [55.7262, 37.55639],
//     [55.75116, 37.62872],
//     [55.66766, 37.67069],
//     [55.7942, 37.74907],
//     [55.76013, 37.61864],
//     [55.74138, 37.62086],
//     [55.75533, 37.61784],
//     [55.7473, 37.60511],
//     [55.76323, 37.57659],
//     [55.76144, 37.58365],
//     [55.76015, 37.62469],
//     [55.75489, 37.62158]]


module.exports = new SalesmanController()