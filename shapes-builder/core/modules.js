var ParallelogramBuilderModules = (function () {
    var modules = {
        app: {}
    };

    /**
     * 
     * @param {Object} object
     * @param {String} path
     * @returns {*}
     */
    function findProperty(object, path) {
        var current = object;
                
        if (path.indexOf('.') === -1) {
            return current[path];
        }
        
        path.split('.').forEach(function (name) {
            if (!current[name]) {
                current[name] = {};
            }
            
            current = current[name];            
        });
        
        return current;
    }    
    
    return {
        /**
         * 
         * @param {String} moduleName          
         * @param {object} moduleObject
         * @param {String=} parentModuleNamePath 
         */
        register: function (parentModuleNamePath, moduleName, moduleObject) {
            var parentModule = findProperty(modules, parentModuleNamePath);
            
            if (parentModule[moduleName]) {
                throw new Error('Module with such name already exist');
            }
            
            parentModule[moduleName] = moduleObject;
        },

        /**
         * 
         * @param {String} moduleNamePath
         * @returns {object}
         */
        get: function (moduleNamePath) {
            return findProperty(modules, moduleNamePath);
        }
    }    
})();