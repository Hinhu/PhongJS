var context = document.querySelector("canvas").getContext("2d");


var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth/2;
var focalLength = 1000;

var areStrokesVisible = false;

var spheres = [
    new Sphere(0, 0, 0, 10, 10, 10, "#848d9b")
];

spheres[0].translateZ(50);
console.log(spheres[0].faces)
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
    width = document.documentElement.clientWidth/2;

    context.canvas.height = height;
    context.canvas.width = width;

    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#FFFFFF";
    for (var i = 0; i < facesToRender.length; i++) {
        facesToRender[i].draw(context, focalLength, width, height);
    }
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 32) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].translateY(0.5);
        }
    } else if (event.keyCode === 67) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].translateY(-0.5);
        }
    } else if (event.keyCode === 37) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].translateX(0.5);
        }
    } else if (event.keyCode === 39) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].translateX(-0.5);
        }
    } else if (event.keyCode === 38) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].translateZ(-0.5);
        }
    } else if (event.keyCode === 40) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].translateZ(0.5);
        }
    } else if (event.keyCode === 104) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].rotateX(-0.05);
        }
    } else if (event.keyCode === 98) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].rotateX(0.05);
        }
    } else if (event.keyCode === 100) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].rotateY(0.05);
        }
    } else if (event.keyCode === 102) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].rotateY(-0.05);
        }
    } else if (event.keyCode === 103) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].rotateZ(0.05);
        }
    } else if (event.keyCode === 105) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].rotateZ(-0.05);
        }
    } else if (event.keyCode == 107) {
        focalLength += 10;
    } else if (event.keyCode == 109) {
        focalLength -= 10;
    } else if (event.keyCode == 96) {
        areStrokesVisible = !areStrokesVisible;
    }
    calculateFaces();
});


calculateFaces();
loop();
