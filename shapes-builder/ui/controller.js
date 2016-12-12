ParallelogramBuilderModules.register('app.ui', 'Controller', function () {

    return {
        /**
         * 
         * @param {Object} canvasElement
         * @param {Object} mouseControl
         * @returns {init}
         */
        init: function (canvasElement, mouseControl) {
            this.canvasElement = canvasElement;
            this.mouseControl = mouseControl;
            
            return this;
        },

        initUiEvens: function() {
            var self = this;

            this.canvasElement.addEventListener('mousedown', function(e) {
                self.mouseControl.onMouseDown(e.clientX, e.clientY);
            });

            this.canvasElement.addEventListener('mouseup', function(e) {
                self.mouseControl.onMouseUp(e.clientX, e.clientY);
            });


            this.canvasElement.addEventListener('mousemove', function(e) {
                self.mouseControl.onMouseMove(e.clientX, e.clientY);
            });

            this.canvasElement.addEventListener('mouseout', function(e) {
                self.mouseControl.onMouseOut(e.clientX, e.clientY);
            });
            
            this.canvasElement.addEventListener('click', function(e) {
                self.mouseControl.onStageClick(e.clientX, e.clientY);
            });
        }
    }
    
}());