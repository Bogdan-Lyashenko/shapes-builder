ParallelogramBuilderModules.register('app.shapes', 'PrimitiveCircle', function (Helpers, CollisionCheck, EventEmitter) {

    var ColorsPallet = Helpers.getColorsPallet();

    var EventsMap = {
        POSITION_UPDATED: 'positionUpdated'
    };
    
    var StatesMap = {
        dot: {
            color: ColorsPallet.BLACK,
            radius: 2
        },

        selected: {
            isSelected: true,
            color: ColorsPallet.GREEN,
            radius: 8
        },
        unSelected: {
            isSelected: false,
            color: ColorsPallet.RED,
            radius: 5.5
        }
    };


    /**
     *
     * @param {String} id
     * @constructor
     */
    function PrimitiveCircle (id) {
        this.id = id;

        this.position = { x: 0, y: 0 };
        this.state = StatesMap.dot;
        this.eventEmitter = EventEmitter.create();
    }

    PrimitiveCircle.prototype = {
        onSelect: function () {
            this.setState(StatesMap.selected);
        },

        onUnSelect: function () {
            this.setState(StatesMap.unSelected);
        },

        /**
         * 
         * @param {Number} x
         * @param {Number} y
         */
        onDrag: function (x, y) {            
            this.setPosition(x, y);
            
            this.eventEmitter.emit(EventsMap.POSITION_UPDATED);
        },

        /**
         *
         * @param {Number} x
         * @param {Number} y
         */
        setPosition: function (x, y) {
            this.position.x = x;
            this.position.y = y;
        },


        /**
         * 
         * @param {Object} state
         */
        setState: function(state) {            
            this.state = state;
        },

        /**
         * 
         * @param {Number} pointX
         * @param {Number} pointY
         * @returns {boolean}
         */
        hasPoint: function (pointX, pointY) {
            return CollisionCheck.circleHasPoint(this.position.x, this.position.y, this.state.radius, pointX, pointY);
        },

        /**
         * 
         * @returns {boolean}
         */
        isSelectedState: function () {
            return this.state.isSelected;
        },

        /**
         * 
         * @returns {object}
         */
        getRenderData: function () {
            return {
                x: this.position.x,
                y: this.position.y,
                radius: this.state.radius,
                color: this.state.color,
                text: ('\n(' + this.position.x + ', ' + this.position.y + ')')
            };
        }        
    };
    
    return {
        /**
         *
         * @returns {PrimitiveCircle}
         */
        create: function () {
            return new PrimitiveCircle(Helpers.generateId());
        },

        /**
         * 
         * @returns {Object}
         */
        getEventsMap: function () {
            return EventsMap;
        }
    };
    
}(
    ParallelogramBuilderModules.get('app.helpers.Helpers'),
    ParallelogramBuilderModules.get('app.arithmetic.CollisionCheck'),
    ParallelogramBuilderModules.get('app.helpers.EventEmitter')
));