var context = document.querySelector("canvas").getContext("2d");


var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;
var focalLength = 1000;

var areStrokesVisible = false;

var spheres = [
    new Sphere(0, 0, 0, 10, 200, 200, "#848d9b")
];
console.log(spheres[0].vertexes)
var facesToRender = [];


function calculateFaces() {
    /*
    var boxesToRender = [];
    for (var i = 0; i < spheres.length; i++) {
        if (!spheres[i].isLeftBehind()) {
            boxesToRender.push(spheres[i]);
        }
    }

    facesToRender = [];
    for (var i = 0; i < boxesToRender.length; i++) {
        var box = boxesToRender[i];
        for (var j = 0; j < 6; j++) {
            var facePoints = [];
            for (var k = 0; k < 4; k++) {
                facePoints.push(box.vertexes[box.faces[j][k]]);
            }
            let face;
            if(areStrokesVisible){
                face = new Face(facePoints, box.color,"#FFFFFF");
            }else{
                face = new Face(facePoints, box.color,box.color);
            }
            if (face.isBack(width / 2, height / 2, focalLength)) {
                continue;
            }
            facesToRender.push(face);
        }
    }

    paintersAlgorithm(facesToRender);
    */
}

function loop() {

    window.requestAnimationFrame(loop);

    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;

    context.canvas.height = height;
    context.canvas.width = width;

    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#FFFFFF";

    spheres.forEach((sphere,i)=>{
        sphere.vertexes.forEach((v,i)=>{

            let x = v.x * (focalLength / v.z) + width * 0.5;
            let y = v.y * (focalLength / v.z) + height * 0.5;

            context.fillRect(x,y,1,1);
            
        })
    })
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
    } else if( event.keyCode == 96){
        areStrokesVisible=!areStrokesVisible;
    }
    calculateFaces();
});


calculateFaces();
loop();
