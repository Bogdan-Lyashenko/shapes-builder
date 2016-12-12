ParallelogramBuilderModules.register('app', 'Builder', (function (
    Parallelogram, ControlEvents, MouseControl, Controller, CanvasRender, EventEmitter
) {
    
    var EventsMap = {
        STATUS_UPDATED: 'statusUpdated'
    };

    var ParallelogramEvents = Parallelogram.getEventsMap();
    
    return {
        init: function (canvas) {
            this.render = CanvasRender.init(canvas);
            this.eventEmitter = EventEmitter.create();

            Controller.init(canvas, MouseControl).initUiEvens();
            
            this.initItems();
        },

        
        initItems: function () {
            this.parallelogram = Parallelogram.create();

            this.initEventsListeners(this.parallelogram);

            return this;
        },

        /**
         *
         * @param {Object} parallelogram
         */
        initEventsListeners: function (parallelogram) {
            var self = this;

            MouseControl.addEventListener(parallelogram, ControlEvents.STAGE_CLICK, function (x, y) {
                parallelogram.processVertexCreation(x, y);
            });

            parallelogram.eventEmitter.on(ParallelogramEvents.VERTEX_ADDED, function (vertex) {
                self.render.addToFillCirclesRenderingList(vertex);
            });

            parallelogram.eventEmitter.on(ParallelogramEvents.CENTER_CIRCLE_ADDED, function (circle) {
                self.render.addToStrokeCirclesRenderingList(circle);
            });

            parallelogram.eventEmitter.on(ParallelogramEvents.COMPLETED, function () {
                self.render.addToParallelogramsRenderingList(parallelogram);

                parallelogram.vertexList.forEach(function (vertex) {
                    vertex.onUnSelect();

                    MouseControl.addEventListener(vertex, ControlEvents.SELECT, vertex.onSelect);
                    MouseControl.addEventListener(vertex, ControlEvents.UN_SELECT, vertex.onUnSelect);
                    MouseControl.addEventListener(vertex, ControlEvents.DRAG, vertex.onDrag);
                });
            });
        },

        /**
         *
         * @param {Object} parallelogram
         */
        removeEventsListeners: function (parallelogram) {
            MouseControl.removeEventListener(parallelogram, ControlEvents.STAGE_CLICK);

            parallelogram.vertexList.forEach(function (vertex) {
                MouseControl.removeEventListener(vertex, ControlEvents.SELECT);
                MouseControl.removeEventListener(vertex, ControlEvents.UN_SELECT);
                MouseControl.removeEventListener(vertex, ControlEvents.DRAG);
            });
        },

        /**
         * 
         * @param {Function} cb
         */
        onStatusUpdate: function (cb) {
            this.eventEmitter.on(EventsMap.STATUS_UPDATED, cb);
        },
        
        reset: function () {
            this.removeEventsListeners(this.parallelogram);
            this.render.resetLists();

            this.initItems();
        }
    }    
})(    
    ParallelogramBuilderModules.get('app.shapes.Parallelogram'),
    ParallelogramBuilderModules.get('app.controls.ControlEvents'),
    ParallelogramBuilderModules.get('app.controls.MouseControl'),
    ParallelogramBuilderModules.get('app.ui.Controller'),
    ParallelogramBuilderModules.get('app.ui.CanvasRender'),
    ParallelogramBuilderModules.get('app.helpers.EventEmitter')
));