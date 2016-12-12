ParallelogramBuilderModules.register('app.shapes', 'Parallelogram', function (
        PrimitiveCircle, Circle, GeomCalculation, EventEmitter, Helpers
    ) {

    var BLUE_COLOR = Helpers.getColorsPallet().BLUE;
    
    var DiagonalMatrix = [
        [1,3,0,2],
        [0,2,1,3],
        [1,3,2,0],
        [0,2,3,1]
    ];

    var EventsMap = {
        NOT_STARTED: 'notStarted',
        IN_PROGRESS: 'inProgress',
        COMPLETED: 'completed',

        VERTEX_ADDED: 'vertexAdded',
        CENTER_CIRCLE_ADDED: 'centerCircleAdded'
    };
    
    var StatesMap = {
        buildingNotStarted: {
            event: EventsMap.NOT_STARTED,
            isNotStarted: true,
            
            /**
             * 
             * @param {Number} vertexNumber
             * @returns {boolean}
             */
            isStateChange: function (vertexNumber) {
                return vertexNumber > 0;
            },

            /**
             * 
             * @returns {Object}
             */
            next: function () {
                return StatesMap.buildingInProgress;
            },
            
            applyAction: function() {}
        },
        
        buildingInProgress: {
            event: EventsMap.IN_PROGRESS,
            isInProgress: true,
            
            /**
             *
             * @param {Number} vertexNumber
             * @returns {boolean}
             */
            isStateChange: function (vertexNumber) {
                return vertexNumber === 3;
            },

            /**
             *
             * @returns {Object}
             */
            next: function () {
                return StatesMap.buildingCompleted;
            },

            applyAction: function() {}
        },
        
        buildingCompleted: {
            event: EventsMap.COMPLETED,
            isCompleted: true,

            /**
             * 
             * @returns {null}
             */
            next: function () {
                return null
            },
            
            applyAction: function() {                
                this.createLastVertex();                
                this.createCenterMassCircle();
                
                this.initDynamicVertexAligning();
            }
        }
    };

    /**
     * 
     * @param {String} id
     * @constructor
     */
    function Parallelogram(id) {
        this.id = id;
        
        this.state = StatesMap.buildingNotStarted;
        this.eventEmitter = EventEmitter.create();
        
        this.vertexList = [];
        this.centerMassCircle = null;
    }
    
    Parallelogram.prototype = {

        /**
         * 
         * @param {Number} x
         * @param {Number} y
         */
        processVertexCreation: function (x, y) {
            if (this.state.isCompleted) {
                return;
            }

            this.createVertexAt(x, y);            
            this.updateState();
        },

        /**
         *
         * @param {Number} positionX
         * @param {Number} positionY
         */
        createVertexAt: function (positionX, positionY) {
            var vertex = PrimitiveCircle.create();
            vertex.setPosition(positionX, positionY);            
            this.vertexList.push(vertex);
            
            this.eventEmitter.emit(EventsMap.VERTEX_ADDED, vertex);
        },
        
        updateState: function () {
            if (!this.state.isStateChange(this.vertexList.length)) {
                return;
            }
            
            this.state = this.state.next();
            this.state.applyAction.apply(this);

            this.eventEmitter.emit(this.state.event);
        },

        createLastVertex: function () {
            var vertexPositions = this.getVertexPositions(),
                lastVertexPosition = GeomCalculation.getLastParallelogramVertex(
                    vertexPositions[0],
                    vertexPositions[2],
                    vertexPositions[1]
                );
            
            this.createVertexAt(lastVertexPosition.x, lastVertexPosition.y);            
        },

        createCenterMassCircle: function () {
            var vertexPositions = this.getVertexPositions(),
                centerMassPosition = GeomCalculation.getParallelogramDiagonalCenter(
                    vertexPositions[0],
                    vertexPositions[2]
                );
            
            this.createCircleAt(centerMassPosition.x, centerMassPosition.y);
        },

        /**
         * 
         * @param {Number} positionX
         * @param {Number} positionY
         */
        createCircleAt: function (positionX, positionY) {
            var circle = Circle.create();
            
            circle.setPosition(positionX, positionY);
            circle.setAreaAndUpdateRadius(this.getParallelogramArea());
            
            this.centerMassCircle = circle;
            this.eventEmitter.emit(EventsMap.CENTER_CIRCLE_ADDED, circle);
        },

        initDynamicVertexAligning: function () {
            var self = this,
                eventName = PrimitiveCircle.getEventsMap().POSITION_UPDATED;

            this.vertexList.forEach(function (vertex, index) {
                
                vertex.eventEmitter.on(eventName, function () {
                    self.rebuildOppositeVertexPosition(index);
                    self.rebuildCentreMassCircleSize();
                });                
            });
        },

        /**
         *
         * @param {Number} index
         */
        rebuildOppositeVertexPosition: function (index) {
            var scenario = DiagonalMatrix[index],
                vertexPositions = this.getVertexPositions(),
                newPosition = GeomCalculation.getLastParallelogramVertex(
                    vertexPositions[scenario[0]],
                    vertexPositions[scenario[1]],
                    vertexPositions[scenario[2]]
                );

            this.vertexList[scenario[3]].setPosition(newPosition.x, newPosition.y);
        },

        rebuildCentreMassCircleSize: function () {
            var area = this.getParallelogramArea();
            this.centerMassCircle.setAreaAndUpdateRadius(area);
        },

        /**
         * 
         * @returns {number}
         */
        getParallelogramArea: function () {
            var vertexPositions = this.getVertexPositions();
                
            return GeomCalculation.getParallelogramArea(
                vertexPositions[0],
                vertexPositions[1],
                vertexPositions[2]
            );
        },

        /**
         * 
         * @returns {Array}
         */
        getVertexPositions: function () {
            var positions = [];
            
            this.vertexList.forEach(function (vertex) {
                positions.push(vertex.position);
            });
            
            return positions;
        },

        /**
         * 
         * @returns {*|Array}
         */
        getRenderData: function () {
            return {
                color: BLUE_COLOR,
                vertexes: this.getVertexPositions()
            };            
        }
    };
    
    return {
        /**
         * 
         * @returns {Parallelogram}
         */
        create: function () {
            return new Parallelogram(Helpers.generateId());
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
    ParallelogramBuilderModules.get('app.shapes.PrimitiveCircle'),
    ParallelogramBuilderModules.get('app.shapes.Circle'),
    ParallelogramBuilderModules.get('app.arithmetic.GeomCalculation'),
    ParallelogramBuilderModules.get('app.helpers.EventEmitter'),
    ParallelogramBuilderModules.get('app.helpers.Helpers')
));