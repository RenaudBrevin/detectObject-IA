// // Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
// let classifier;

// // A variable to hold the image we want to classify
// let img;

// function modelReady() {
//   console.log('Model is ready!!!');
// }

// function imageReady() {
//   image(img, 0, 0, width, height);
// }

// function setup() {
//   createCanvas(400, 400);
//   img = createImg('images/oiseau.jpg', imageReady);
//   img.hide();
//   background(0);
//   classifier = ml5.imageClassifier('MobileNet', modelReady);
//   classifier.classify(img, gotResult);
// }

// // A function to run when we get any errors and the results
// function gotResult(error, results) {
//   // Display error in the console
//   if (error) {
//     console.error(error);
//   } else {
//     // The results are in an array ordered by confidence.
//     console.log(results);
//     createDiv(`Label: ${results[0].label}`);
//     createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`);
//   }
// }


// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let video;
let label = '';

function modelReady() {
  console.log('Model is ready!!!');
  classifier.predict(gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    //console.log(results);
    label = results[0].label;
    classifier.predict(gotResult);
  }
}

// function imageReady() {
//   image(img, 0, 0, width, height);
// }

function setup() {
  createCanvas(610, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}