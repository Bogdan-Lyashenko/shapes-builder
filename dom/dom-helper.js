ParallelogramBuilderModules.register('app.dom', 'DomHelper', function () {
    return {

        /**
         * 
         * @param {String} id
         * @returns {Element}
         */
        getById: function (id) {
            return document.getElementById(id);
        },

        /**
         * 
         * @param {Object} element
         */
        show: function (element) {
            element.style.display = 'block';
        },
        
        /**
         * 
         * @param {Object} element
         */
        hide: function (element) {
            element.style.display = 'none';
        }
    }
    
}());