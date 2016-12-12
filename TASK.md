#Shapes
The goal of this task is to write a simple HTML/JavaScript program that interacts with the user and draws geometrical shapes to the screen. The program should be launched by viewing “index.html” in a modern, standards-compliant, web browser.

#Basic flow
The user selects three arbitrary points within the client area of the browser. As they are selected, the program highlights their location by drawing red circles, 11 pixels in diameter, cantered on each selected point.

Based on these three points, two additional shapes are drawn:
* A blue parallelogram, having three of its corners in the points selected by the user.
* A yellow circle, with the same area and centre of mass as the parallelogram. 
These shapes should not be filled.

The coordinates of the selected points, as well as the area of the parallelogram and circle, should be presented numerically to the user.
The user should be free to move the points around the screen at any time. This makes the parallelogram, circle and printed information update accordingly.
There should also be a “reset” feature that clears the board and allows the user to select three new points, repeating the process described above. Finally, there is an “about” feature that presents information about the program, its author and how it should be used, in your own words.
