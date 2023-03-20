let video;
let detector;
let detections = [];
let donnees = ['chair','person', 'cell phone', 'cup', 'bottle', 'book', 'laptop', 'glasses', 'pen', 'shoes', 'mouse', 'remote', ];

let link = "https://www.recettes-dessert.fr/files/2019/01/Capture-1.png";

function preload() {
    detector = ml5.objectDetector('cocossd');
}

function gotResults(error, results){
    if(error){
        console.error(error);
        return;
    }
    detections = results;
    detector.detect(video, gotResults);
    CheckObject();
}

function videoLoaded() {
    detector.detect(video, gotResults);
}

function setup() {
    let canvasContainer = select('#canvasContainer');
    let canvas = createCanvas(640, 480);
    canvas.parent(canvasContainer);
    video = createCapture(VIDEO, videoLoaded);
    video.size(640, 480);
    video.hide();
}

function draw() {
    image(video, 0, 0);

    for (let i = 0; i < detections.length; i++) {
        let object = detections[i];
        noStroke();
        fill(0, 255, 0);
        textSize(16);
        text(object.label, object.x + 20, object.y + 30);
        noFill();
        strokeWeight(4);
        stroke(0, 255, 0);
        rect(object.x, object.y, object.width, object.height);
    }
}

//Commence et change l'objet à trouver
function ChangeObject(){
    let nombre = false;
    if (donnees.length == 0) {
        document.getElementById("phrase").innerHTML = "Félicitation vous avez trouvé tous les objets !";
        document.getElementById("objet").innerHTML = "";
        //creation bouton html qui au click active une fonction "recommencer"
        document.getElementById("change").innerHTML = "";
        document.getElementById("change").innerHTML = "<button onclick='Recommencer()'>Réinitialiser</button>";
        nombre = true;
    }

    if(!nombre){
        let random = Math.floor(Math.random() * donnees.length);
        let object = donnees[random];

        document.getElementById("change").innerHTML = "";
        document.getElementById("change").innerHTML = "Changer d'objet";

        document.getElementById("objet").innerHTML = "";
        document.getElementById("phrase").innerHTML = "";

        document.getElementById("phrase").innerHTML = "L'objet à trouver est :";
        document.getElementById("objet").innerHTML = object;

        donnees.splice(random, 1);
        console.log(object);
    }
}

//fonction qui vérifie si l'objet est trouvé
function CheckObject() {
    let object = document.getElementById("objet").innerHTML;
    for (let i = 0; i < detections.length; i++) {
        if (detections[i].label == object) {
            console.log("L'objet a été trouvé !");
            ChangeObject();
            break;
        }
    }
}

function Recommencer(){
    location.reload();
}
