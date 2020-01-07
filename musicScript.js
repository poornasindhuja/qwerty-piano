if (localStorage.getItem("sound-intervals") != null) {
    document.getElementById('play-recording').style.visibility = 'visible';
}

function resultCharCode(event) {
    var ch = event.key;
    var buttonToClick=document.getElementById(ch.toLowerCase());
    if(buttonToClick!=undefined){
        buttonToClick.click();
    }
}

var starttime;

function startRecord() {
    starttime = Date.now();
    var startButton=document.getElementById("start-recording");
    startButton.removeAttribute("record");
    startButton.setAttribute("record", "true");
    startButton.style.visibility='hidden';
    document.getElementById("stop-recording").style.visibility = 'visible';
    document.getElementById("play-recording").style.visibility = 'visible';
}

function stopRecord() {
    var startButton=document.getElementById("start-recording");
    startButton.removeAttribute("record");
    startButton.setAttribute("record", "true");
    startButton.style.visibility='visible';
    document.getElementById("stop-recording").style.visibility='hidden';
    timeIntervals=[];
}

function createNote(source) {
    var image = document.createElement('img');
    var id = Date.now().toString();
    image.setAttribute('id', id);
    image.src = source + ".jpg";
    image.style.width = '40px';
    image.style.height = '40px';
    image.classList.add('img-fly');
    document.getElementById("page").appendChild(image);
    setTimeout(() => {
        document.getElementById("page").removeChild(image);
    }, 2000);
}

function playRecorded(musicSounds, intervals, index) {
    musicSounds = musicSounds || JSON.parse(localStorage.getItem("sounds-data"));
    intervals = intervals || JSON.parse(localStorage.getItem("sound-intervals"));
    index = index || 0;
    if (musicSounds.length < index)
        return;
    new Audio(`${musicSounds[index]}.wav`).play();
    setTimeout(() => {
        index = index + 1;
        playRecorded(musicSounds, intervals, index);
    }, intervals[index]);
}

var sounds = [];
var timeIntervals = [];

function playMusic(event) {
    var sound = event.getAttribute("data-audio");
    var currentElementId = event.getAttribute("id");
    createNote(sound);
    var audioPlayer = new Audio(`${sound}.wav`);
    document.getElementById(currentElementId).classList.add('play');
    setInterval(() => {
        document.getElementById(currentElementId).classList.remove('play');
    }, 2000);
    var record = document.getElementById("start-recording").getAttribute("record");
    if (record == "true") {
        sounds.push(sound);
        var delay = Date.now() - starttime;
        starttime = Date.now();
        timeIntervals.push(delay);
        localStorage.setItem("sounds-data", JSON.stringify(sounds));
        localStorage.setItem("sound-intervals", JSON.stringify(timeIntervals));
    }
    audioPlayer.play();
}