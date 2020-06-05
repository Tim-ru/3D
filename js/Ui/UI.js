class UI {
    constructor({ callbacks = {} }) {
        //callbacks
        this.move = (callbacks.move instanceof Function) ? callbacks.move : function () { };
        const printPoints = (callbacks.printPoints instanceof Function)
            ? callbacks.printPoints
            : function () { };
        const printEdges = (callbacks.printEdges instanceof Function)
            ? callbacks.printEdges
            : function () { };
        const printPolygons = (callbacks.printPolygons instanceof Function)
            ? callbacks.printPolygons
            : function () { };
        const time = (callbacks.time instanceof Function)
            ? callbacks.printPolygons
            : function () { };
        //events
        document.addEventListener('keydown', event => this.keyDown(event));
        document.getElementById('printPoints')
            .addEventListener('click', function () { printPoints(this.checked); });
        document.getElementById('printEdges')
            .addEventListener('click', function () { printEdges(this.checked); });
        document.getElementById('printPolygons')
            .addEventListener('click', function () { printPolygons(this.checked); });
    }

    keyDown(event) {
        switch (event.keyDown) {
            case 37: return this.move('left'); // left arrow
            case 38: return this.move('up'); // up arrow
            case 39: return this.move('right'); // right arrow  
            case 40: return this.move('down'); // down arrow      
        }
    }
}