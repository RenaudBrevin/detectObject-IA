let video
let detector
let detections = []

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
