class Face {
    constructor(points, fillColor) {
        this.points = points;
        this.color = fillColor;


        this.center = new Point3D(
            (points[0].x + points[1].x + points[2].x) / 3,
            (points[0].y + points[1].y + points[2].y) / 3,
            (points[0].z + points[1].z + points[2].z) / 3,
        );

        let edge0 = new Point3D(points[1].x,points[1].y,points[1].z);
        let edge1 = new Point3D(points[2].x,points[2].y,points[2].z);
        
        edge0.sub( points[0] );
        
        edge1.sub( points[1] );
        
        this.normal = edge1.getCrossProduct( edge0 );
        this.normal.normalize();

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
        let points = new Array(this.points.length);

        for (let i = 0; i < points.length; i++) {

            let p = this.points[i];

            let x = p.x * (focalLenght / p.z) + width * 0.5;
            let y = p.y * (focalLenght / p.z) + heigth * 0.5;

            points[i] = new Point2D(x, y);
        }
        return points;
    }

    draw(context, focalLenght, width, heigth,color) {
        var points = this.project(focalLenght, width, heigth);

        context.strokeStyle = 'rgb('+color.r+','+color.g+','+color.b+')';
        context.fillStyle = 'rgb('+color.r+','+color.g+','+color.b+')';

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (var k = 1; k < points.length; k++) {
            context.lineTo(points[k].x, points[k].y);
        }
        context.closePath();
        context.fill();
        context.stroke();
    }
}