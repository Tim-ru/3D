Surfaces.prototype.planet = (
  count = 20,
  R = 6,
  { x0 = 0, y0 = 0, z0 = 0 },
  color = '#ff0000',
  animation,
  yearLength
) => {
  let points = [];
  let edges = [];
  let polygons = [];
  // расставить точки
  const delta = Math.PI * 2 / count;
  for (let i = 0; i <= Math.PI; i += delta) {
    for (let j = 0; j < Math.PI * 2; j += delta) {
      const x = x0 + R * Math.sin(i) * Math.cos(j);
      const y = y0 + R * Math.sin(i) * Math.sin(j);
      const z = z0 + R * Math.cos(i);
      points.push(new Point(x, y, z));
    }
  }

  // нарисовать ребра
  for (let i = 0; i < points.length; i++) {
    // кольца 
    if (i + 1 < points.length && (i + 1) % count !== 0) {
      edges.push(new Edge(i, i + 1));
    } else if ((i + 1) % count === 0) {
      edges.push(new Edge(i, i + 1 - count));
    }
    // "дольки"
    if (i + count < points.length) {
      edges.push(new Edge(i, i + count));
    }
    // полигоны
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
      polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
    } else if ((i + count) < points.length && (i + 1 + count) % count === 0) {
      polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
    }
  }



  return new Subject(points, edges, polygons, animation, yearLength);
}