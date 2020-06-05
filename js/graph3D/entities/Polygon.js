class Polygon{
    constructor(points = [], color = '#FF0000', distance = 0) {
        this.points = points;
        this.color = this.hexToRgb(color);
        this.distance = distance;
        this.lumen = 1; // Освещенность полигона [0..1]
        this.visible = true; 
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),    
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)    
        } : {r: 0, g: 0, b: 0};
    }

    rgbToHex(r, g, b) {
        return `rgb(${r},${g},${b})`;
    }
}