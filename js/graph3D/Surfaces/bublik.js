Surfaces.prototype.bublik = (count = 10, R = 10) => {
    const points = [];
    const edges = [];
    const polygons = [];

    function setRoundOfPoints(count, R) {
        const da = 2 * Math.PI / count;
        for (let i = 0; i < 2 * Math.PI; i += da) {
            const x = R * Math.sin(i);
            const z = R * Math.cos(i);
            const y = 5;
            points.push(new Point(x, y, z));
        }
    }

    setRoundOfPoints(count, R);
    setRoundOfPoints(count, R / 1.4);

    for (let i = 0; i < points.length; i++) {
        if (points[i + count]) {
            edges.push(new Edge(i, i + count));
        }
        if (points[i + 1] && i !== count - 1) {
            edges.push(new Edge(i, i + 1));
        }
        edges.push(new Edge(0, count - 1));
        edges.push(new Edge(count, 2*count - 1));
    }

    


    return new Subject(points, edges, [
        new Polygon([0, 1, 11, 10 ], '#355C7D'), new Polygon([1, 2, 12, 11 ], '#32A37D'), 
        new Polygon([2, 3, 13, 12 ], '#3A6DDD'), new Polygon([3, 4, 14, 13 ], '#39F47D'), 
        new Polygon([4, 5, 15, 14 ], '#D255C7'), new Polygon([5, 6, 16, 15 ], '#355A5F'),
        new Polygon([6, 7, 17, 16 ], '#4552D3'), new Polygon([7, 8, 18, 17 ], '#32227D'), 
        new Polygon([8, 9, 19, 18 ], '#35527d'), new Polygon([9, 0, 10, 19 ], '#35435D')
    ]);
}