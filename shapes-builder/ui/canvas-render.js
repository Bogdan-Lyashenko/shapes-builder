ParallelogramBuilderModules.register('app.ui', 'CanvasRender', function (Helpers) {

    var TEXT_COLOR = Helpers.getColorsPallet().BLACK;

    var StageW = 1200,
        StageH = 700;

    /**
     *
     * @param {Function} animateFn
     */
    function initRequestAnimationFrameLoop(animateFn) {
        function helperFn() {
            animateFn(window.requestAnimationFrame(helperFn));
        }

        helperFn();
    }
    
    var Render = {
        fillCirclesList: [],
        strokeCirclesList: [],
        parallelogramsList: [],
        
        onEnterFrame: function () {
            var self = this;
    
            this.clearStage();
    
            this.parallelogramsList.forEach(function (item) {
                self.renderParallelogram(item.getRenderData());
            });
    
            this.strokeCirclesList.forEach(function (item) {
                self.renderStrokeCircle(item.getRenderData());
            });

            this.fillCirclesList.forEach(function (item) {
                self.renderFillCircle(item.getRenderData());
            });
        },
    
        clearStage: function () {
            this.ctx.clearRect(0, 0, StageW, StageH);
        },
    
        /**
         *
         * @param {Array} data
         */
        renderFillCircle: function (data) {
            var ctx = this.ctx;
    
            ctx.beginPath();
            ctx.arc(data.x, data.y, data.radius, Math.PI * 2, 0);
            ctx.fillStyle = data.color;
            ctx.fill();
            ctx.fillStyle = TEXT_COLOR;
            ctx.stroke();
            ctx.fillText(data.text, data.x, data.y);
            ctx.closePath();
        },

        /**
         *
         * @param {Array} data
         */
        renderStrokeCircle: function (data) {
            var ctx = this.ctx;

            ctx.beginPath();
            ctx.arc(data.x, data.y, data.radius, Math.PI * 2, 0);
            ctx.strokeStyle = data.color;
            ctx.stroke();
            ctx.strokeStyle = TEXT_COLOR;
            ctx.fillText(data.text, data.x, data.y);
            ctx.closePath();
        },
    
        /**
         *
         * @param {Object} data
         */
        renderParallelogram: function (data) {
            var ctx = this.ctx,
                start = data.vertexes[0];
    
            ctx.beginPath();
            ctx.strokeStyle = data.color;
            ctx.moveTo(start.x, start.y);

            data.vertexes.forEach(function (item, i) {
                ctx.lineTo(item.x, item.y);
            });

            ctx.lineTo(start.x, start.y);
            ctx.stroke();
            ctx.closePath();
        },
    
        /**
         *
         * @param {Object} item
         */
        addToFillCirclesRenderingList: function (item) {
            this.fillCirclesList.push(item);
        },

        /**
         *
         * @param {Object} item
         */
        addToStrokeCirclesRenderingList: function (item) {
            this.strokeCirclesList.push(item);
        },
        
        /**
         *
         * @param {Object} item
         */
        addToParallelogramsRenderingList: function (item) {
            this.parallelogramsList.push(item);
        },
    
        resetLists: function () {
            this.fillCirclesList = [];    
            this.strokeCirclesList = [];    
            this.parallelogramsList = [];    
        }
    };


    return {
        /**
         *
         * @param {HtmlElement} canvas
         * @returns {Object}
         */
        init: function (canvas) {
            var render = Object.create(Render);
            
            render.ctx = canvas.getContext('2d');
            render.ctx.font = "20px Arial";

            initRequestAnimationFrameLoop(function () {
                render.onEnterFrame();
            });

            return render;
        }
    }
}(
    ParallelogramBuilderModules.get('app.helpers.Helpers')
));