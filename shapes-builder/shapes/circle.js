ParallelogramBuilderModules.register('app.shapes', 'Circle', function (Helpers, GeomCalculation) {
    var YELLOW_COLOR = Helpers.getColorsPallet().YELLOW;

    /**
     * 
     * @param {String} id
     * @constructor
     */
    function Circle (id) {
        this.id = id;

        this.radius = 0;
    }

    Circle.prototype = {
        color: YELLOW_COLOR,

        /**
         * 
         * @param {Number} x
         * @param {Number} y
         */
        setPosition: function (x, y) {
            this.position = {
                x: x,
                y: y
            };
        },

        /**
         *
         * @param {Number} area
         */
        setAreaAndUpdateRadius: function (area) {
            this.area = area;
            this.radius = GeomCalculation.getRadiusFromCircleArea(area);
        },


        /**
         * 
         * @returns {object}
         */
        getRenderData: function () {
            return {          
                x: this.position.x,
                y: this.position.y,
                radius: this.radius,
                color: this.color,
                text: 'area: ' + this.area.toFixed(0) + ' px'
            };
        }        
    };
    
    return {
        /**
         *
         * @returns {Circle}
         */
        create: function () {
            return new Circle(Helpers.generateId());
        }
    };
    
}(
    ParallelogramBuilderModules.get('app.helpers.Helpers'),
    ParallelogramBuilderModules.get('app.arithmetic.GeomCalculation')
));