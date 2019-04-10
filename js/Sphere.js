class Sphere {

    constructor(x, y, z, radius, parallelsNum, meridiansNum, color) {
        this.radius = radius;
        this.color = color;
        this.center=new Point3D(x,y,z);
        this.vertexes = [];
        this.faces=[];

        let vAng = Math.PI / parallelsNum;
        let hAng = Math.PI * 2 / meridiansNum;

        let northPole = new Point3D(x, y - this.radius, z);
        this.vertexes.push(northPole);

        for (let i = 1; i < parallelsNum; i++) {
            let tmp = new Point3D(x, y - this.radius, z);
            tmp.rotateZ(vAng * i);   

            for(let j=0; j<meridiansNum; j++){
                let tmp2=new Point3D(tmp.x,tmp.y,tmp.z);
                tmp2.rotateY( hAng * j , new Point3D(this.center.x,this.center.y,tmp.z));
                this.vertexes.push( tmp2 );
            }
        }

        let southPole = new Point3D(x, y + this.radius, z);
        this.vertexes.push(southPole);

        for(let i=1; i<meridiansNum; i++){
            this.faces.push([0,i,i+1]);
        }
        this.faces.push([0,meridiansNum,1]);

        for(let i=0; i<this.vertexes.length-1-meridiansNum; i++){
            this.faces.push([i,i+1,i+meridiansNum]);
            this.faces.push([i+1,i+meridiansNum,i+1+meridiansNum]);
        }

        for(let i=this.vertexes.length-1-meridiansNum; i<this.vertexes.length-2; i++){
            this.faces.push([this.vertexes.length-1,i,i+1]);
        }
        this.faces.push([this.vertexes.length-1,this.vertexes.length-2,this.vertexes.length-1-meridiansNum]);
    }

    translateX(x) {
        for (var i = 0; i < this.vertexes.length; i++) {
            this.vertexes[i].x += x;
        }
    }

    translateY(y) {
        for (var i = 0; i < this.vertexes.length; i++) {
            this.vertexes[i].y += y;
        }
    }

    translateZ(z) {
        for (var i = 0; i < this.vertexes.length; i++) {
            this.vertexes[i].z += z;
        }
    }

    rotateX(radian) {

        var sin = Math.sin(radian);
        var cos = Math.cos(radian);

        for (var i = 0; i < this.vertexes.length; i++) {

            var p = this.vertexes[i];

            p.y = p.y * cos - p.z * sin;
            p.z = p.y * sin + p.z * cos;

        }

    }

    rotateY(radian) {

        var sin = Math.sin(radian);
        var cos = Math.cos(radian);

        for (var i = 0; i < this.vertexes.length; i++) {

            var p = this.vertexes[i];

            p.x = p.z * sin + p.x * cos;
            p.z = p.z * cos - p.x * sin;

        }

    }

    rotateZ(radian) {

        var sin = Math.sin(radian);
        var cos = Math.cos(radian);

        for (var i = 0; i < this.vertexes.length; i++) {

            var p = this.vertexes[i];

            p.x = p.x * cos - p.y * sin;
            p.y = p.y * cos + p.x * sin;

        }

    }

    project(focalLenght, width, heigth) {
        var points = new Array(this.vertexes.length);

        for (var i = 0; i < points.length; i++) {

            let p = this.vertexes[i];

            let x = p.x * (focalLenght / p.z) + width * 0.5;
            let y = p.y * (focalLenght / p.z) + heigth * 0.5;

            points[i] = new Point2D(x, y);
        }
        return points;
    }

    isLeftBehind() {
        for (var i = 0; i < this.vertexes.length; i++) {
            if (this.vertexes[0].z < this.width) {
                return true;
            }
        }
        return false;
    }

}