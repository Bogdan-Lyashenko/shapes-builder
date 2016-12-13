# shapes-builder

####No third party libraries used. Only native JS and own code. 

I’ve implemented dependency injection module (shapes-builder/core/modules.js) and use it to register and inject services across the app (there is only one global variable).

Example:
to register 

```javascript
ParallelogramBuilderModules.register('app.helpers', 'EventEmitter', function () {
	return {your class here}
})
```

to use
```javascript
ParallelogramBuilderModules.get('app.helpers.EventEmitter').
```

I’ve implemented the mechanism for handling mouse events on shapes painted on canvas (shapes-builder/controls/mouse-control.js), it can be used similarly to DOM events subscribing. 
Example:
```javascript
MouseControl.addEventListener(vertex, ControlEvents.SELECT, function() {
	//vertex selected
});
```

Rendering (View) is separated from shapes data and app logic, there is a canvas-render service which takes data and draws it on canvas. RequestAnimatedFrame is used to build smooth animation during parallelogram transformations. 

Feedback from the bottom layers to the top is built on events model. An entity can notify subscribers about own state changes. No tight coupling.

All services related to geometry calculations located separately in shapes-builder/arithmetic/ folder.

There are three main shape classes: parallelogram, circle, and primitive-circle (vertex of a parallelogram) with encapsulated logic. Parallelogram building process is designed by states changing mechanism.

Shapes-builder code is completely separated from parent page and can be easily moved or integrated into other web pages. 
