class Math3D {

    constructor() {
        this.matrix = {
            transform: [[1, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1]]
        };

        // уравнение плоскости в удобном виде
        this.plane = {
            // нормальный вектор
            A: 0, 
            B: 0, 
            C: 0,
            // точки плоскости (смещение)
            x0: 0,
            y0: 0,
            z0: 0,
            // точку камеры
            xs0: 0,
            ys0: 0,
            zs0: 0,
        }
    }
    
    // вычислить вектор по 2-м точкам
    calcVector(a, b){
        return {
            x: b.x - a.x,
            y: b.y - a.y,
            z: b.z - a.z
        }
    }

    //скалярное произведение в координатной форме
    scalProd(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    // вычислить угол между двумя векторами
    calcCorner(a, b) {
        return this.scalProd(a, b) / (Math.sqrt(this.scalProd(a, a)) * Math.sqrt(this.scalProd(b, b)))
    }

    calcVectorModule(a) {
        return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2));
    }

    // векторное произведение векторов
    vectProd(a, b) {
        return {
            x: a.y * b.z - a.z * b.y,
            y: a.z * b.x - a.x * b.z,
            z: a.x * b.y - a.y * b.x
        }
    }

    // расчет уравнения плоскости и запись его в структуру
    // point1 - camera
    // point2 - center (экрана)
    calcPlaneEquation(point1, point2) {
        const vector = this.calcVector(point1, point2);
        // координаты плоскости
        this.plane.A = vector.x;
        this.plane.A = vector.y;
        this.plane.A = vector.z;
        this.plane.x0 = point2.x;
        this.plane.y0 = point2.y;
        this.plane.z0 = point2.z;
        // дописать камеру
        this.plane.xs0 = point1.x;
        this.plane.ys0 = point1.y;
        this.plane.zs0 = point1.z;
    }

    // получить проекцию точки на плоскоскость экрана относително камеры
    getProection(point) {
        const {A, B, C, x0, y0, z0, xs0, ys0, zs0 } = this.plane;
        const m = point.x - xs0;
        const n = point.y - ys0;
        const p = point.z - zs0;
        const t = (A*(x0 - xs0) +  B*(y0 - ys0) + C*(z0 - zs0)) / (A*m + B*n + C*p);
        const ps = {
            x: x0 + m * t,
            y: y0 + n * t,
            z: z0 + p * t,
        }
        return {
            x: ps.x - A,
            y: ps.y - B,
            z: ps.z - C,
        }
    }

    // перемножение матрицы преобразования на точку
    // m = [x, y, z, 1]
    // T = [[],[],[],[]] по 4 элемента
    multMatrix(T, m) {
        const c = [0, 0, 0, 0];
        const rows = T.length;
        const colomns = m.length;
        for (let i = 0; i < rows; i++) {
            let S = 0;
            for (let j = 0; j < colomns; j++) {        
                S += T[j][i] * m[j];   
            }
            c[i] = S;
        }
        return c;
    }


    multMatrixes(A, B) {
        const C = [[0,0,0,0],
                   [0,0,0,0],
                   [0,0,0,0],
                   [0,0,0,0]];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let s = 0;
                for (let k = 0; k < 4; k++) {
                    s += A[i][k] * B[k][j];
                }
                C[i][j] = s;
            }
        }
        return C;
    }

    zoomMatrix(delta) {
        return [[delta, 0, 0,  0],
                [0, delta, 0,  0],
                [0,  0, delta, 0],
                [0,  0,    0,  1]];
    }

    moveMatrix(sx, sy, sz) {
        return [[1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [sx, sy, sz, 1]];
    }

    rotateOxMatrix(alpha) {
        return [[1, 0, 0, 0],
                [0, Math.cos(alpha), Math.sin(alpha), 0],
                [0, -Math.sin(alpha), Math.cos(alpha), 0],
                [0, 0, 0, 1]];
    }

    rotateOyMatrix(alpha) {
        return [[Math.cos(alpha), 0, -Math.sin(alpha), 0],
                [0, 1, 0, 0],
                [Math.sin(alpha), 0, Math.cos(alpha), 0],
                [0, 0, 0, 1]];
    }

    rotateOzMatrix(alpha) {
        return [[Math.cos(alpha), Math.sin(alpha), 0, 0],
                [-Math.sin(alpha), Math.cos(alpha), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]];
    }

    // заполнить общую матрицу преобразований (на основании массива преобразований)
    transformMatrix(matrixes = []) {
        this.matrix.transform =  [[1, 0, 0, 0],
                                  [0, 1, 0, 0],
                                  [0, 0, 1, 0],
                                  [0, 0, 0, 1]];
        matrixes.forEach(matrix => {
            this.matrix.transform = this.multMatrixes(this.matrix.transform, matrix);
        });
    }

    transform(point) {
        const array = this.multMatrix(this.matrix.transform, [point.x, point.y, point.z, 1]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }
}