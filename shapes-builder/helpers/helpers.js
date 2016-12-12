ParallelogramBuilderModules.register('app.helpers', 'Helpers', function () {
    var ColorsPallet = {
        RED: 'red',
        GREEN: 'forestgreen',
        YELLOW: 'yellow',
        BLUE: 'midnightblue',
        BLACK: '#222'
    };
    
    return {
        /**
         *
         * @returns {string}
         */
        generateId: function () {
            var str = 'ID',
                parts = 5,
                i;

            for (i = 0; i < parts; i++) {
                str += Math.floor((1 + Math.random()) * 0x10000).toString(16);
            }

            return str;
        },

        /**
         * 
         * @returns {object}
         */
        getColorsPallet: function () {
            return ColorsPallet;
        }
    };

}());