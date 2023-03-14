let img
let detector

let link = "https://www.recettes-dessert.fr/files/2019/01/Capture-1.png"


function preload() {
    img = loadImage(link)
    detector = ml5.objectDetector('cocossd')
}

function gotResults(error, results){
    if(error){
        console.error(error)
    }
    console.log(results)
    for (let i = 0; i < results.length; i++) {
        noStroke()
        fill(1, 1, 1)
        text(results[i].label, results[i].x, results[i].y + 10)
        noFill()
        strokeWeight(4)
        stroke(0, 255, 0)
        rect(results[i].x, results[i].y, results[i].width, results[i].height)
    }
}

function setup() {
    createCanvas(640, 480, width, height)
    //console.log(detector)
    image(img, 0, 0)
    detector.detect(img, gotResults)
}
