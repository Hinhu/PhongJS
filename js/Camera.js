var context = document.querySelector("canvas").getContext("2d");


var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth / 2;
var focalLength = 1000;

var areStrokesVisible = false;

var spheres = [
    new Sphere(0, 0, 0, 10, 100, 100, "#FFFFFF")
];

var light = new Light(0, 0, 0, 1, 1, 1);

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
                face = new Face(facePoints, sphere.color, "#FFFFFF");
            } else {
                face = new Face(facePoints, sphere.color, sphere.color);
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

    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#FFFFFF";
    for (var i = 0; i < facesToRender.length; i++) {
        let face = facesToRender[i];

        let projector = new Point3D(face.center.x - light.x, face.center.y - light.y, face.center.z - light.z);
        projector.normalize();

        let viewer = new Point3D(face.center.x, face.center.y, face.center.z - focalLength);
        viewer.normalize();

        let scalarProjector = projector.x * face.normal.x + projector.y * face.normal.y + projector.z * face.normal.z;
        let scalarViewer = viewer.x * face.normal.x + viewer.y * face.normal.y + viewer.z * face.normal.z;

        let viewerLength = Math.sqrt(Math.pow(viewer.x, 2) + Math.pow(viewer.y, 2), Math.pow(viewer.z, 2));
        let projectorLength = Math.sqrt(Math.pow(projector.x, 2) + Math.pow(projector.y, 2), Math.pow(projector.z, 2));
        let normalLength = Math.sqrt(Math.pow(face.normal.x, 2) + Math.pow(face.normal.y, 2), Math.pow(face.normal.z, 2));

        let cosB = scalarProjector / (projectorLength * normalLength);

        let cosAB = scalarViewer / (viewerLength * normalLength);
        let B = Math.acos(cosB);
        let AB = Math.acos(cosAB);
        let cosA = Math.cos(AB - B) || 0;

        let l = light.Ia * Ka + light.I * (Kd * Math.pow(cosB, light.n) + Ks * Math.pow(cosA, light.n));

        face.draw(context, focalLength, width, height, l);
    }
    if (light.z >= 0) {
        context.fillStyle = "#FFFFFF";
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

let sliderX = document.getElementById("X");
sliderX.oninput = function () {
    light.x = sliderX.value;
}

let sliderY = document.getElementById("Y");
sliderY.oninput = function () {
    light.y = sliderY.value;
}

let sliderZ = document.getElementById("Z");
sliderZ.oninput = function () {
    light.z = sliderZ.value;
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

let ambient = document.getElementById("ambient");
ambient.oninput = function () {
    if (ambient.value >= 0) {
        light.Ia = ambient.value;
    } else {
        ambient.value = 0;
        light.Ia = 0;
    }
}

let casting = document.getElementById("casting");
casting.oninput = function () {
    if (casting.value >= 0) {
        light.I = casting.value;
    } else {
        casting.value = 0;
        light.I = 0;
    }
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
