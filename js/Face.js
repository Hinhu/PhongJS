class Face {
    constructor(points, fillColor, strokeColor) {
        this.points = points;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;

        let p0 = points[0];
        let p1 = new Point3D(
            (points[1].x - p0.x) / 2 + p0.x,
            (points[1].y - p0.y) / 2 + p0.y,
            (points[1].z - p0.z) / 2 + p0.z,
        );
        let p3 = new Point3D(
            (points[3].x - p0.x) / 2 + p0.x,
            (points[3].y - p0.y) / 2 + p0.y,
            (points[3].z - p0.z) / 2 + p0.z,
        );

        this.center = new Point3D(
            p3.x + p1.x - p0.x,
            p3.y + p1.y - p0.y,
            p3.z + p1.z - p0.z,
        );

    }

    isBack() {
        var p1 = this.points[0];
        var p2 = this.points[1];
        var p3 = this.points[2];

        let v1 = new Point3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
        let v2 = new Point3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
        let n = new Point3D(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);

        return -p1.x * n.x + -p1.y * n.y + -p1.z * n.z > 0;
    }

    project(focalLenght, width, heigth) {
        var points = new Array(this.points.length);

        for (var i = 0; i < points.length; i++) {

            let p = this.points[i];

            let x = p.x * (focalLenght / p.z) + width * 0.5;
            let y = p.y * (focalLenght / p.z) + heigth * 0.5;

            points[i] = new Point2D(x, y);
        }
        return points;
    }

    draw(context, focalLenght, width, heigth) {
        var points = this.project(focalLenght, width, heigth);

        context.strokeStyle = this.strokeColor;
        context.fillStyle = this.fillColor;

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (var k = 1; k <= 3; k++) {
            context.lineTo(points[k].x, points[k].y);
        }
        context.closePath();
        context.fill();
        context.stroke();
    }
}