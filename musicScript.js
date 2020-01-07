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
    document.getElementById("play-recording").style.visibility = 'hidden';
}

function stopRecord() {
    var startButton=document.getElementById("start-recording");
    startButton.removeAttribute("record");
    startButton.setAttribute("record", "true");
    startButton.style.visibility='visible';
    document.getElementById("stop-recording").style.visibility='hidden';
    document.getElementById("play-recording").style.visibility = 'visible';
    timeIntervals=[];
}

var canIPlay=true;
var pauseIndex,musicSounds,intervals;

function playRecorded() {
    document.getElementById('start-recording').style.visibility='hidden';
    document.getElementById("play-recording").style.visibility = 'hidden';
    document.getElementById("pause").style.visibility='visible';
    document.getElementById("stop").style.visibility="visible";
    play();
}

function pause(){
    document.getElementById("resume").style.visibility="visible";
    document.getElementById("pause").style.visibility="hidden";
    canIPlay=false;
}

function resume(){
    document.getElementById("resume").style.visibility="hidden";
    document.getElementById("pause").style.visibility="visible";
    canIPlay=true;
    play(musicSounds,intervals,pauseIndex);
}

function stop(){
    canIPlay=false;
    document.getElementById("stop").style.visibility="hidden";
    document.getElementById("resume").style.visibility="hidden";
    document.getElementById("pause").style.visibility="hidden";
    document.getElementById("start-recording").style.visibility = 'visible';
    document.getElementById("play-recording").style.visibility = 'visible';
}

function play(musicSounds, intervals, index){
    if (canIPlay == true) {
        musicSounds = musicSounds || JSON.parse(localStorage.getItem("sounds-data"));
        intervals = intervals || JSON.parse(localStorage.getItem("sound-intervals"));
        index = index || 0;
        if (index > musicSounds.length - 1) {
            document.getElementById("start-recording").style.visibility = 'visible';
            document.getElementById("play-recording").style.visibility = 'visible';
            document.getElementById("pause").style.visibility="hidden";
            return;
        }
        new Audio(`${musicSounds[index]}.wav`).play();
        setTimeout(() => {
            index = index + 1;
            play(musicSounds, intervals, index);
        }, intervals[index]);
    }else{
        pauseIndex=index;
    }
}

var sounds = [];
var timeIntervals = [];

function playMusic(event) {
    var sound = event.getAttribute("data-audio");
    var currentElementId = event.getAttribute("id");
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