ParallelogramBuilderModules.register('app.arithmetic', 'GeomCalculation', function (DistanceCalculation) {
    return {

        /**
         *
         * @param {Object} pointA
         * @param {Object} pointB
         * @param {Object} pointC
         * @returns {number}
         */
        getParallelogramArea: function (pointA, pointB, pointC) {
            return 2 * this.getTriangleArea(pointA, pointB, pointC);
        },

        /**
         *
         * @param {Object} pointA
         * @param {Object} pointB
         * @param {Object} pointC
         * @returns {number}
         */
        getTriangleArea: function (pointA, pointB, pointC) {
            var AB = DistanceCalculation.getDistanceBetweenPoints(
                pointA.x,
                pointA.y,
                pointB.x,
                pointB.y
            );

            var BC = DistanceCalculation.getDistanceBetweenPoints(
                pointB.x,
                pointB.y,
                pointC.x,
                pointC.y
            );

            var AC = DistanceCalculation.getDistanceBetweenPoints(
                pointA.x,
                pointA.y,
                pointC.x,
                pointC.y
            );

            var p = (AB + BC + AC) / 2;
            return Math.sqrt(p * (p - AB) * (p - BC) * (p - AC));
        },

        /**
         *
         * @param {Number} area
         * @returns {number}
         */
        getRadiusFromCircleArea: function (area) {
            return Math.sqrt(area / Math.PI);
        },

        /**
         * 
         * @param {Object} pointA         
         * @param {Object} pointC
         * @param {Object} pointB
         * @returns {object}
         */
        getLastParallelogramVertex: function(pointA, pointC, pointB) {
            var pointD,
                pointO;

            pointO = this.getParallelogramDiagonalCenter(pointA, pointC);
            pointD = this.getParallelogramDiagonalVertex(pointB, pointO);

            return pointD;
        },

        /**
         *
         * @param {Object} pointA
         * @param {Object} pointC
         * @returns {object}
         */
        getParallelogramDiagonalCenter: function (pointA, pointC) {
            return {
                x: (pointA.x + pointC.x)/2,
                y: (pointA.y + pointC.y)/2
            };
        },

        /**
         *
         * @param {Object} pointB
         * @param {Object} pointO
         * @returns {object}
         */
        getParallelogramDiagonalVertex: function (pointB, pointO) {
            return {
                x: - pointB.x + 2*pointO.x,
                y: - pointB.y + 2*pointO.y
            };
        }
    };

}(
    ParallelogramBuilderModules.get('app.arithmetic.DistanceCalculation')
));