module.exports = class PathService {
    constructor(points, distanceFunc) {
        this.points = points;
        this.distanceFunc = distanceFunc;
        this.initializeOrder();
        this.initializeDistances();
    }

    initializeOrder() {
        this.order = new Array(this.points.length);
        for (let i = 0; i < this.order.length; i++) this.order[i] = i;
    }

    //Calculates the distance for all the points.
    initializeDistances() {
        this.distances = new Array(this.points.length * this.points.length);
        for(let i = 0; i < this.points.length; i++) {
            // Optimization: Starting at i+1 avoids repeats and identity distances.
            // We just need to make sure we don't access the empty cells later.
            for(let j = i + 1; j < this.points.length; j++) {
                this.distances[j + i * this.points.length] = this.distanceFunc(this.points[i], this.points[j]);
            }
        }
    }

    /* Perform one iteration of the simulated annealing.
    *
    * Choose two random points in the path, and calculate how much the path distance would change
    * if you swapped the two points. If it would make the path shorter, swap them.
    *
    * If not, have a random chance to swap them anyway.
    * This random chance is based on how bad the move is,
    * as well as how early in the annealing process we are (the "temperature"). */

    change(temp) {
        const i = this.randomPos(), j = this.randomPos();
        const delta = this.deltaDistance(i, j);
        if (delta < 0 || Math.random() < Math.exp(-delta / temp)) {
            this.swap(i,j);
        }
    }

    swap(i, j) {
        const tmp = this.order[i];
        this.order[i] = this.order[j];
        this.order[j] = tmp;
    }

    deltaDistance(i, j) {
        const jm1 = this.index(j - 1),
            jp1 = this.index(j + 1),
            im1 = this.index(i - 1),
            ip1 = this.index(i + 1);
        let s =
            this.distance(jm1, i)
            + this.distance(i, jp1)
            + this.distance(im1, j)
            + this.distance(j, ip1)
            - this.distance(im1, i)
            - this.distance(i, ip1)
            - this.distance(jm1, j)
            - this.distance(j, jp1);
        if (jm1 === i || jp1 === i)
            s += 2 * this.distance(i, j);
        return s
    }

    index(i) {
        return (i + this.points.length) % this.points.length
    }

    //Get the ith point in the path order.
    access(i) {
        return this.points[this.order[this.index(i)]]
    }

    distance(i, j) {
        if (i === j) return 0; // Identity.
        // Ensure low is actually lower.
        let low = this.order[i], high = this.order[j]
        if (low > high) {
            low = this.order[j]
            high = this.order[i]
        }

        return this.distances[low * this.points.length + high] || 0
    }

    randomPos() {
        return 1 + Math.floor(Math.random() * (this.points.length - 1))
    }
}

