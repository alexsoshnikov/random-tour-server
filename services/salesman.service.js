const pathService = require('./path.service')
const pointDto = require('../dtos/point.dto')
// remove it
const placesService = require('./places.service')

module.exports = class SalesmanService {
    static async solve(points, tempCoefficient = 0.999, distance = this.euclidean) {
        const pointsCls = points.map(([x, y]) => new pointDto(x, y))
        const path = new pathService(pointsCls, distance)
        placesService.getPlacesOfInterest()


        if (pointsCls.length < 2) return path.order

        if (!tempCoefficient) {
            tempCoefficient = 1 - Math.exp(-10 - Math.min(points.length, 1e6) / 1e5)
        }

        for (let temperature = 100 * distance(path.access(0), path.access(1));
             temperature > 1e-6;
             temperature *= tempCoefficient) {

            path.change(temperature)
        }

        return path.order
    }

    static euclidean(p, q) {
        const dx = p.x - q.x, dy = p.y - q.y
        return Math.sqrt(dx*dx + dy*dy)
    }
}
