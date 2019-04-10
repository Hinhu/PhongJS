class Point3D {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    };

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
        let tmp = new Vec3d(this.x, this.y, this.z);
        tmp.normalize();
        return tmp;
    }

    rotateX(a) {
        let nz = (this.z * Math.cos(a) - this.y * Math.sin(a));
        let ny = (this.z * Math.sin(a) + this.y * Math.cos(a));
        this.z = nz;
        this.y = ny;
    }

    rotateY(a,origin) {
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

}