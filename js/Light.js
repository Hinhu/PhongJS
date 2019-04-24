class Light {
    constructor(x, y, z, n, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.n = n;
        this.color=color;
    }

    projectedPosition(width, heigth, focalLenght) {
        let x = this.x * (focalLenght / this.z) + width * 0.5;
        let y = this.y * (focalLenght / this.z) + heigth * 0.5;
        return new Point2D(x, y);
    }

    translateX(x) {
        this.x += x;
    }

    translateY(y) {
        this.y += y;
    }

    translateZ(z) {
        this.z += z;
    }

    rotateX(radian) {
        var sin = Math.sin(radian);
        var cos = Math.cos(radian);

        this.y = this.y * cos - this.z * sin;
        this.z = this.y * sin + this.z * cos;
    }

    rotateY(radian) {

        var sin = Math.sin(radian);
        var cos = Math.cos(radian);

        this.x = this.z * sin + this.x * cos;
        this.z = this.z * cos - this.x * sin;
    }

    rotateZ(radian) {
        var sin = Math.sin(radian);
        var cos = Math.cos(radian);

        this.x = this.x * cos - this.y * sin;
        this.y = this.y * cos + this.x * sin;
    }
}