const PathService = require('./path.service')
const PointService = require('./point.service')

class SalesmanService {
    async solve(points, tempCoefficient = 0.999, callback, distance = this.euclidean) {
        const pointsCls = points.map(([x, y]) => new PointService(x, y))
        const path = new PathService(pointsCls, distance)
        if (pointsCls.length < 2) return path.order

        if (!tempCoefficient) {
            tempCoefficient = 1 - Math.exp(-10 - Math.min(points.length, 1e6) / 1e5)
        }

        for (let temperature = 100 * distance(path.access(0), path.access(1));
             temperature > 1e-6;
             temperature *= tempCoefficient) {

            path.change(temperature)
            if (typeof callback === 'function') callback(path.order)
        }

        return path.order;
    }

    euclidean(p, q) {
        const dx = p.x - q.x, dy = p.y - q.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
}

module.exports = new SalesmanService()