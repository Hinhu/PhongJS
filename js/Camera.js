var context = document.querySelector("canvas").getContext("2d");


var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth / 2;
var focalLength = 1000;

var areStrokesVisible = false;

var spheres = [
    new Sphere(0, 0, 0, 10, 50, 50, new Color(100, 0, 100))
];

var light = new Light(5, 5, 40, 1, 1, 1, new Color(100, 100, 100));

var Ka = 0.5;
var Kd = 0.5;
var Ks = 0.5;


spheres[0].translateZ(50);
var facesToRender = [];


function calculateFaces() {



    facesToRender = [];
    for (var i = 0; i < spheres.length; i++) {
        var sphere = spheres[i];
        for (var j = 0; j < sphere.faces.length; j++) {
            var facePoints = [];
            for (var k = 0; k < 3; k++) {
                facePoints.push(sphere.vertexes[sphere.faces[j][k]]);
            }
            let face;
            if (areStrokesVisible) {
                face = new Face(facePoints, sphere.color);
            } else {
                face = new Face(facePoints, sphere.color);
            }
            if (face.isBack(width / 2, height / 2, focalLength)) {
                continue;
            }
            facesToRender.push(face);
        }
    }

    paintersAlgorithm(facesToRender);
}

function loop() {

    window.requestAnimationFrame(loop);

    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth / 2;

    context.canvas.height = height;
    context.canvas.width = width;

    context.fillStyle = "#333333";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#FFFFFF";
    for (var i = 0; i < facesToRender.length; i++) {
        let face = facesToRender[i];

        let followFaceCenter = new Point3D(face.center.x, face.center.y, face.center.z);
        followFaceCenter.sub(new Point3D(0, 0, -focalLength));
        followFaceCenter.normalize();


        let dotProd = face.normal.getScalarProduct(followFaceCenter);

        let obsNormal = new Point3D(0, 0, 1);

        let tmp = new Point3D(face.center.x, face.center.y, face.center.z);
        tmp.sub(new Point3D(light.x, light.y, light.y));
        tmp.normalize();

        let beta = Math.acos(face.normal.getScalarProduct(tmp));

        let tmp2 = face.normal.getCrossProduct(tmp);

        let R = new Point3D(tmp.x, tmp.y, tmp.z);
        R.rotateAV(tmp2, beta * 2);

        let dotProd2 = Math.pow(obsNormal.getScalarProduct(R), light.n);

        let color = new Color(0, 0, 0);
        if (dotProd < 0) {
            color.r += light.color.r * Math.abs(dotProd) * Kd + light.color.r * Math.abs(dotProd2) * Ks;
            color.g += light.color.g * Math.abs(dotProd) * Kd + light.color.g * Math.abs(dotProd2) * Ks;
            color.b += light.color.b * Math.abs(dotProd) * Kd + light.color.b * Math.abs(dotProd2) * Ks;
        }


        color.r += face.color.r * Ka;
        color.g += face.color.g * Ka;
        color.b += face.color.b * Ka;

        if (color.r > 255) {
            color.r = 255;
        }
        if (color.g > 255) {
            color.g = 255;
        }
        if (color.b > 255) {
            color.b = 255;
        }
        face.draw(context, focalLength, width, height, color);
    }
    if (light.z >= 0) {
        context.fillStyle = 'rgb(' + light.color.r + ',' + light.color.g + ',' + light.color.b + ')';
        let l = light.projectedPosition(width, height, focalLength);
        context.fillRect(l.x, l.y, 5, 5);
    }

}

document.addEventListener('keydown', event => {
    if (event.keyCode === 32) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].translateY(0.5);
        }
        light.translateY(0.5);
    } else if (event.keyCode === 67) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].translateY(-0.5);
        }
        light.translateY(-0.5);
    } else if (event.keyCode === 37) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].translateX(0.5);
        }
        light.translateX(0.5);
    } else if (event.keyCode === 39) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].translateX(-0.5);
        }
        light.translateX(-0.5);
    } else if (event.keyCode === 38) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].translateZ(-0.5);
        }
        light.translateZ(-0.5);
    } else if (event.keyCode === 40) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].translateZ(0.5);
        }
        light.translateZ(0.5);
    } else if (event.keyCode === 104) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].rotateX(-0.05);
        }
        light.rotateX(-0.05);
    } else if (event.keyCode === 98) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].rotateX(0.05);
        }
        light.rotateX(0.05);
    } else if (event.keyCode === 100) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].rotateY(0.05);
        }
        light.rotateY(0.05);
    } else if (event.keyCode === 102) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].rotateY(-0.05);
        }
        light.rotateY(-0.05);
    } else if (event.keyCode === 103) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].rotateZ(0.05);
        }
        light.rotateZ(0.05);
    } else if (event.keyCode === 105) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].rotateZ(-0.05);
        }
        light.rotateZ(-0.05);
    } else if (event.keyCode == 107) {
        focalLength += 10;
    } else if (event.keyCode == 109) {
        focalLength -= 10;
    } else if (event.keyCode == 96) {
        areStrokesVisible = !areStrokesVisible;
    }
    calculateFaces();
});

let sliderR = document.getElementById("R");
sliderR.oninput = function () {
    light.color.r = sliderR.value;
}

let sliderG = document.getElementById("G");
sliderG.oninput = function () {
    light.color.g = sliderG.value;
}

let sliderB = document.getElementById("B");
sliderB.oninput = function () {
    light.color.b = sliderB.value;
}

let sliderKa = document.getElementById("ambientM");
sliderKa.oninput = function () {
    Ka = sliderKa.value;
}

let sliderKd = document.getElementById("diffuseM");
sliderKd.oninput = function () {
    Kd = sliderKd.value;
}

let sliderKs = document.getElementById("specularM");
sliderKs.oninput = function () {
    Ks = sliderKs.value;
}


let n = document.getElementById("n");
n.oninput = function () {
    if (n.value >= 1) {
        light.n = n.value;
    } else {
        n.value = 1;
        light.n = 1;
    }
}

calculateFaces();
loop();
