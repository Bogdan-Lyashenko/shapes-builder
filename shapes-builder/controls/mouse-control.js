ParallelogramBuilderModules.register('app.controls', 'MouseControl', function (ControlEvents) {
    var EventListenersMap = {};

    EventListenersMap[ControlEvents.SELECT] = [];
    EventListenersMap[ControlEvents.UN_SELECT] = [];
    EventListenersMap[ControlEvents.DRAG] = [];
    EventListenersMap[ControlEvents.STAGE_CLICK] = [];

    return {
        /**
         * 
         * @param {Object} item
         * @param {String} eventType
         * @param {Function} cb
         */
        addEventListener: function(item, eventType, cb) {
            EventListenersMap[eventType].push({
                item: item,
                handler: cb.bind(item)
            });
        },

        /**
         * 
         * @param {Object} target
         * @param {String} eventType
         */
        removeEventListener: function (target, eventType) {
            var list = EventListenersMap[eventType],
                indexOfTarget = -1;

            list.forEach(function (element, index) {
                if (element.item.id === target.id) {
                    indexOfTarget = index;
                }
            });

            if (indexOfTarget !== -1) {
                list.splice(indexOfTarget, 1);
            }
        },

        /**
         *
         * @param {Number} x
         * @param {Number} y
         */
        onStageClick: function(x, y) {
            EventListenersMap[ControlEvents.STAGE_CLICK].forEach(function(listener) {               
                listener.handler(x, y);
            });
        },
        
        /**
         *
         * @param {Number} mousePointX
         * @param {Number} mousePointY
         */
        onMouseDown: function(mousePointX, mousePointY) {
            EventListenersMap[ControlEvents.SELECT].forEach(function(listener) {
                if (listener.item.hasPoint(mousePointX, mousePointY)) {
                    listener.handler();
                }
            });
        },

        onMouseUp: function() {
            EventListenersMap[ControlEvents.UN_SELECT].forEach(function(listener) {                
                listener.handler();
            });
        },

        /**
         *
         * @param {Number} mousePointX
         * @param {Number} mousePointY
         */
        onMouseMove: function(mousePointX, mousePointY) {
            EventListenersMap[ControlEvents.DRAG].forEach(function(listener) {
                if (listener.item.isSelectedState()) {
                    listener.handler(mousePointX, mousePointY);
                }
            });
        },

        onMouseOut: function() {
            EventListenersMap[ControlEvents.UN_SELECT].forEach(function(listener) {                
                listener.handler();
            });
        }
    };

}(
    ParallelogramBuilderModules.get('app.controls.ControlEvents')
));