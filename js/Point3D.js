class Point3D {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    };

    translateX(x) {
        this.x += x;
    }

    translateY(y) {
        this.y += y;
    }

    translateZ(z) {
        this.z += z;
    }

    scale(k) {
        this.x *= k;
        this.y *= k;
        this.z *= k;
    }

    getMagnituded() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize() {
        this.scale(1.0 / this.getMagnituded());
    }

    getNormalized() {
        let tmp = new Point3D(this.x, this.y, this.z);
        tmp.normalize();
        return tmp;
    }

    rotateX(a) {
        let nz = (this.z * Math.cos(a) - this.y * Math.sin(a));
        let ny = (this.z * Math.sin(a) + this.y * Math.cos(a));
        this.z = nz;
        this.y = ny;
    }

    rotateY(a, o) {
        let origin = o || new Point3D(0,0,0);
        let nx = ((this.x - origin.x) * Math.cos(a) - (this.z - origin.z) * Math.sin(a));
        let nz = ((this.x - origin.x) * Math.sin(a) + (this.z - origin.z) * Math.cos(a));
        this.x = nx;
        this.z = nz;
    }

    rotateZ(a) {
        let nx = (this.x * Math.cos(a) - this.y * Math.sin(a));
        let ny = (this.x * Math.sin(a) + this.y * Math.cos(a));
        this.x = nx;
        this.y = ny;
    }

    getCrossProduct(b) {
        return new Point3D(
            this.y * b.z - this.z * b.y,
            this.z * b.x - this.x * b.z,
            this.x * b.y - this.y * b.x
        );
    }

    getAngleX() {
        let tmp = new Point3D(1, 0, 0);
        let cosAngle = this.getScalarProduct(tmp) / this.getMagnituded();
        return Math.acos(cosAngle);
    }

    getAngleY() {
        let ny = new Point3D(0, 1, 0);
        let cosAngle = this.getScalarProduct(ny) / this.getMagnituded();
        return Math.acos(cosAngle);
    }

    getAngleZ() {
        let tmp = new Point3D(0, 0, 1);
        let cosAngle = this.getScalarProduct(tmp) / this.getMagnituded();
        return Math.acos(cosAngle);
    }

    getHorizAngle() {
        if (this.x == 0 && this.z == 0 && this.y != 0) {
            return 0;
        } else {
            let nX = new Point3D(1, 0, 0); 
            let nZ = new Point3D(0, 0, 1);


            let sX = this.getScalarProduct(nX);
            let sZ = this.getScalarProduct(nZ);

            let dX = new Point3D(sX, 0, 0);
            let dZ = new Point3D(0, 0, sZ);

            let dXZ = new Point3D(0,0,0);
            dXZ.add(dX);
            dXZ.add(dZ);
            dXZ.normalize();
            let horizAngle = Math.acos(nZ.getScalarProduct(dXZ));
            if (dX.x < 0) {
                return Math.PI * 2 - horizAngle;
            } else {
                return horizAngle;
            }
        }
    }

    getVerticAngle() {
        return this.getAngleY();
    }

    rotateAV(axis, a) {
        let hA = axis.getHorizAngle();
        let vA = axis.getVerticAngle();

        this.rotateY(-hA);
        this.rotateX(-vA);


        this.rotateY(a);

        this.rotateX(vA);
        this.rotateY(hA);
    }

    getScalarProduct(arg) {
        return this.x * arg.x + this.y * arg.y + this.z * arg.z;
    }

    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
    }

}