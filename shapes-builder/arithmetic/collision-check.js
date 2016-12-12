ParallelogramBuilderModules.register('app.arithmetic', 'CollisionCheck', function (DistanceCalculation) {
    return {
        /**
         * 
         * @param {Number} circleX
         * @param {Number} circleY
         * @param {Number} circleRadius
         * @param {Number} pointX
         * @param {Number} pointY
         * @returns {boolean}
         */
        circleHasPoint: function(circleX, circleY, circleRadius, pointX, pointY) {
            return DistanceCalculation.getDistanceBetweenPoints(circleX, circleY, pointX, pointY) < circleRadius;
        }
    };

}(
    ParallelogramBuilderModules.get('app.arithmetic.DistanceCalculation')
));