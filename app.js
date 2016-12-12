(function (Builder, DomHelper) {
    var canvas = DomHelper.getById('builder-canvas'),
         helpInfoView = DomHelper.getById('help-info');

    var controls = {
        reset: DomHelper.getById('reset-builder'),
        showHelpInfo: DomHelper.getById('show-help-info'),
        hideHelpInfo: DomHelper.getById('hide-help-info')
    };

    Builder.init(canvas);
    
    controls.reset.addEventListener('click', function () {
        Builder.reset();
    });

    controls.showHelpInfo.addEventListener('click', function () {
        DomHelper.show(helpInfoView)
    });

    controls.hideHelpInfo.addEventListener('click', function () {
        DomHelper.hide(helpInfoView)
    });
    
})(
    ParallelogramBuilderModules.get('app.Builder'),
    ParallelogramBuilderModules.get('app.dom.DomHelper')
);
