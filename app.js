(function (Builder, DomHelper) {
    var canvas = DomHelper.getById('builder-canvas');

    var controls = {
            reset: DomHelper.getById('reset-builder'),
            showHelpInfo: DomHelper.getById('show-help-info'),
            hideHelpInfo: DomHelper.getById('hide-help-info')
        };

    var helpInfoView = DomHelper.getById('help-info');
    var statusInfoView = DomHelper.getById('status-info');

    Builder.init(canvas);
    
    Builder.onStatusUpdate(function () {
        
    });

    controls.showHelpInfo.addEventListener('click', function () {
        DomHelper.show(helpInfoView)
    });

    controls.hideHelpInfo.addEventListener('click', function () {
        DomHelper.hide(helpInfoView)
    });

    controls.reset.addEventListener('click', function () {
        Builder.reset();
    });
    
})(
    ParallelogramBuilderModules.get('app.Builder'),
    ParallelogramBuilderModules.get('app.dom.DomHelper')
);
