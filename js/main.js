window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.onload = function () {
    const WINDOW = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20,
        P1: new Point(-10, 10, -30), // левый верхний угол
        P2: new Point(-10, -10, -30), // левый нижний угол
        P3: new Point(10, -10, -30), // правый нижний угол
        CENTER: new Point(0, 0, -30), // центр окошка, через которое видим мир
        CAMERA: new Point(0, 0, -50) // точка, из которой смотрим на мир
    };
    const ZOOM_OUT = 1.1;
    const ZOOM_IN = 0.9;
    let canMove = false;
    let canPrint = {
        point: false,
        edges: false,
        polygons: true
    };


    const sur = new Surfaces;
    const canvas = new Canvas({ width: 800, height: 800, WINDOW, callbacks: { wheel, mousemove, mouseup, mousedown, move } });
    const graph3D = new Graph3D({ WINDOW });
    const ui = new UI({ callbacks: { move, printPoints, printEdges, printPolygons } });

    // сцена
    const SCENE = [
        // солнечная система из отдельных сфер

// Солнце
sur.planet(
  40,
  r = 200,
  { x0: 0, y0: 0, z0: 0 },
  '#ffff00',
  { rotateOz: new Point }
),
// Меркурий
sur.planet(
  40,
  4.87,
  { x0: -57-r, y0: -57-r, z0: 0 },
  '#660000',
  { rotateOz: new Point(0, 0, 0)},
  88
),
// Венера
sur.planet(
  40,
  12.1,
  { x0: -108-r, y0: -108-r, z0: 0 },
  '#ff0000',
  { rotateOz: new Point(0, 0, 0)},
  225
),
// Земля
sur.planet(
  40,
  12.7,
  { x0: -150-r, y0: -150-r, z0: 0 },
  '#00ee00',
  { rotateOz: new Point(0, 0, 0)},
  365
),
// Марс
sur.planet(
  40,
  12.1,
  { x0: -227-r, y0: -227-r, z0: 0 },
  '#ff0000',
  { rotateOz: new Point(0, 0, 0)},
  687
),
// Юпитер
sur.planet(
  40,
  143,
  { x0: -778-r, y0: -778-r, z0: 0 },
  '#ff9933',
  { rotateOz: new Point(0, 0, 0)},
  4436
),
// Сатурн
sur.planet(
  40,
  120,
  { x0: -1443-r, y0: -1443-r, z0: 0 },
  '#ffffcc',
  { rotateOz: new Point(0, 0, 0)},
  10174
),
// Уран
sur.planet(
  40,
  51,
  { x0: -2877-r, y0: -2877-r, z0: 0 },
  '#6666ff',
  { rotateOz: new Point(0, 0, 0)},
  30680
),
// Нептун
sur.planet(
  40,
  49,
  { x0: -4503-r, y0: -4503-r, z0: 0 },
  '#6600ff',
  { rotateOz: new Point(0, 0, 0)},
  59899
)
    ];
    //ичточник света
    const LIGHT = new Light(-20, 0, -12, 200);


    // about callbacks
    function wheel(event) {
        /*const delta = (event.wheelDelta > 0) ? ZOOM_OUT : ZOOM_IN;
        graph3D.zoomMatrix(delta);
        SCENE.forEach(subject => {
            subject.points.forEach(point => graph3D.transform(point));
            if (subject.animation) {
                for (let key in subject.animation) {
                    graph3D.transform(subject.animation[key]);
                }
            }
        });*/
    }

    function mouseup() {
        canMove = false;
    }

    function mouseleave() {
        mouseup();
    }

    function mousedown() {
        canMove = true;
    }

    function mousemove(event) {
        if (canMove) {
            if (event.movementX) { // крутить вокруг OY
                /*const alpha = canvas.sx(event.movementX) / WINDOW.CAMERA.z * 4;
                graph3D.rotateOyMatrix(alpha);
                SCENE.forEach(subject => {
                    subject.points.forEach(point => graph3D.transform(point));
                    if (subject.animation) {
                        for (let key in subject.animation) {
                            graph3D.transform(subject.animation[key]);
                        }
                    }
                });*/
            }
            if (event.movementY) { // крутить вокруг OX
                /*const alpha = canvas.sy(event.movementY) / WINDOW.CAMERA.z * 4;
                graph3D.rotateOxMatrix(alpha);
                SCENE.forEach(subject => {
                    subject.points.forEach(point => graph3D.transform(point));
                    if (subject.animation) {
                        for (let key in subject.animation) {
                            graph3D.transform(subject.animation[key]);
                        }
                    }
                });*/
            }
        }
    }

    function move(direction) {
        switch (direction) {
            case 'up': graph3D.rotateOxMatrix(Math.PI / 180); break;
            case 'down': graph3D.rotateOxMatrix(-Math.PI / 180); break;
            case 'left': graph3D.rotateOyMatrix(Math.PI / 180); break;
            case 'right': graph3D.rotateOyMatrix(-Math.PI / 180); break;
        }
        graph3D.transform(WINDOW.CAMERA);
        graph3D.transform(WINDOW.CENTER);
        graph3D.transform(WINDOW.P1);
        graph3D.transform(WINDOW.P2);
        graph3D.transform(WINDOW.P3);
    }

    function printPoints(value) {
        canPrint.points = value;
    }

    function printEdges(value) {
        canPrint.edges = value;
    }

    function printPolygons(value) {
        canPrint.polygons = value;
    }

    function offPolygons() {
        flag = true;
    }

    // about render
    // нарисовать полигоны
    function printAllPolygons() {
        if (canPrint.polygons) {

            const polygons = [];

            SCENE.forEach(subject => {
                //graph3D.calcCorner(subject, WINDOW.CAMERA);
                graph3D.calcDistance(subject, WINDOW.CAMERA, 'distance');
                graph3D.calcDistance(subject, LIGHT, 'lumen');
                for (let i = 0; i < subject.polygons.length; i++) {
                    if (subject.polygons[i].visible) {
                        const polygon = subject.polygons[i];
                        const point1 = graph3D.getProection(subject.points[polygon.points[0]]);
                        const point2 = graph3D.getProection(subject.points[polygon.points[1]]);
                        const point3 = graph3D.getProection(subject.points[polygon.points[2]]);
                        const point4 = graph3D.getProection(subject.points[polygon.points[3]]);
                        let { r, g, b } = polygon.color;
                        const lumen = graph3D.calcIllumination(polygon.lumen, LIGHT.lumen);
                        r = Math.round(r * lumen);
                        g = Math.round(g * lumen);
                        b = Math.round(b * lumen);
                        polygons.push({
                            points: [point1, point2, point3, point4],
                            color: polygon.rgbToHex(r, g, b),
                            distance: polygon.distance
                        });
                    }
                }
            });
            // отрисовка всех полигонов
            polygons.sort((a, b) => b.distance - a.distance);
            polygons.forEach(polygon => canvas.polygon(polygon.points, polygon.color));
        }
    }

    function printSubject(subject) {

        // print edges
        if (canPrint.edges) {
            for (let i = 0; i < subject.edges.length; i++) {
                const edges = subject.edges[i];
                const point1 = subject.points[edges.p1];
                const point2 = subject.points[edges.p2];
                canvas.line(graph3D.xs(point1), graph3D.ys(point1), graph3D.xs(point2), graph3D.ys(point2));
            }
        }

        // print points
        if (canPrint.points) {
            for (let i = 0; i < subject.points.length; i++) {
                const points = subject.points[i];
                canvas.point(graph3D.xs(points), graph3D.ys(points));
            }
        }

    }

    function render() {
        canvas.clear();
        printAllPolygons();
        SCENE.forEach(subject => printSubject(subject));
        canvas.text(WINDOW.LEFT, WINDOW.HEIGHT / 2 - 1, 'FPS:' + FPSout);
        canvas.render();
    }

    function animation() {
        // Вращение фигуры
        SCENE.forEach(subject => {
            if (subject.animation) {
                for (let key in subject.animation) {
                    const { x, y, z } = subject.animation[key];
                    const xn = WINDOW.CENTER.x - x;
                    const yn = WINDOW.CENTER.y - y;
                    const zn = WINDOW.CENTER.z - z;
                    const yearLength = (subject.yearLength === null) ? 1 : subject.yearLength;
                    const alpha = (2 * Math.PI) / yearLength;
                    graph3D.animateMatrix(xn, yn, zn, key, alpha, -xn, -yn, -zn);
                    subject.points.forEach(point => graph3D.transform(point));
                }
            }
        });
    }

    setInterval(animation, 10);

    let FPS = 0;
    let FPSout = 0;
    let timestamp = (new Date()).getTime();
    (function animLoop() {

        //Считаем FPS
        FPS++;
        const currentTimestamp = (new Date()).getTime();
        if (currentTimestamp - timestamp >= 1000) {
            timestamp = currentTimestamp;
            FPSout = FPS;
            FPS = 0;
        }

        graph3D.calcPlaneEquation(); // получить и записать плоскость экрана
        graph3D.calcWindowVectors(); // вычислить вектора экрана
        render(); // рисуем сцену
        requestAnimationFrame(animLoop); // зацикливаем отрисовку
    })();
};

