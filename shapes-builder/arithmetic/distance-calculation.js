ParallelogramBuilderModules.register('app.arithmetic', 'DistanceCalculation', function () {
    return {
        /**
         * 
         * @param {Number} aPointX
         * @param {Number} aPointY
         * @param {Number} bPointX
         * @param {Number} bPointY
         * @returns {number}
         */
        getDistanceBetweenPoints: function(aPointX, aPointY, bPointX, bPointY) {
            var dx = aPointX - bPointX,
                dy = aPointY - bPointY;
            
            return Math.sqrt(dx * dx + dy * dy);
        }
    };

}());