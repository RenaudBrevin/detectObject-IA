let video
let detector
let detections = []
let donnees = ['chair','person', 'cell phone']

let link = "https://www.recettes-dessert.fr/files/2019/01/Capture-1.png"


function preload() {
    //video = loadImage(link)
    detector = ml5.objectDetector('cocossd')
}

function gotResults(error, results){
    if(error){
        console.error(error)
    }
    detections = results
    detector.detect(video, gotResults)
    CheckObject();
}

function videoLoaded() {
    detector.detect(video, gotResults);
}

function setup() {
    createCanvas(640, 480)
    video = createCapture(VIDEO, videoLoaded)
    video.size(640, 480)
    video.hide()
    // detector.detect(video, gotResults)
}

function draw() {
    image(video, 0, 0)

    for (let i = 0; i < detections.length; i++) {
        let object = detections[i]
        noStroke()
        fill(0, 255, 0)
        textSize(16);
        text(object.label, object.x + 20, object.y + 30)
        noFill()
        strokeWeight(4)
        stroke(0, 255, 0)
        rect(object.x, object.y, object.width, object.height)
    }
}

//Commence et change l'objet à trouver
function ChangeObject(){
    let random = Math.floor(Math.random() * donnees.length)
    let object = donnees[random];
    document.getElementById("change").innerHTML = "";
    document.getElementById("change").innerHTML = "Changer d'objet";

    document.getElementById("objet").innerHTML = "";
    document.getElementById("phrase").innerHTML = "";

    document.getElementById("phrase").innerHTML = "L'objet à trouver est :";
    document.getElementById("objet").innerHTML = object;
    console.log(object)
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



