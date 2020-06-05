Surfaces.prototype.solarSystem = (
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

// солнечная система из отдельных сфер
/*
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
)*/