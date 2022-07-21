video = "";
objects = [];
status = "";

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas=createCanvas(560, 460);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 580, 480);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
            

            fill("#4B9CD3");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, + 20, objects[i].y + 20);
            noFill();
            stroke("#4B9CD3");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height );
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results)
{
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
