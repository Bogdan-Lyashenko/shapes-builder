ParallelogramBuilderModules.register('app.helpers', 'EventEmitter', function () {
    
    function EventEmitter() {
        this.eventListeners = {};
    }

    EventEmitter.prototype = {

        /**
         * callback register
         * @param {string} name
         * @param {function} callback
         */
        on: function (name, callback) {
            if (!Array.isArray(this.eventListeners[name])) {
                this.eventListeners[name] = [];
            }

            this.eventListeners[name].push(callback);
        },

        /**
         *
         * @param {String} name
         * @param {Object=} event
         */
        emit: function (name, event) {
            if (!Array.isArray(this.eventListeners[name])) {
                return;
            }

            this.eventListeners[name].forEach(function (callback) {
                callback && callback(event);
            });
        }
    };
    
    return {
        /**
         * 
         * @returns {EventEmitter}
         */
        create: function() {
            return new EventEmitter();
        }
    };
}());