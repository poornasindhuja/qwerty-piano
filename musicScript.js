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

var starttime,suffex;

function startRecord() {
    starttime = Date.now();
    counting=true;
    suffex=" ";
    timer();
    var startButton=document.getElementById("start-recording");
    startButton.removeAttribute("record");
    startButton.setAttribute("record", "true");
    startButton.style.visibility='hidden';
    document.getElementById("time").style.visibility='visible';
    document.getElementById("stop-recording").style.visibility = 'visible';
    document.getElementById("play-recording").style.visibility = 'hidden';
}

function timer() {
    if (seconds >= 60) {
        minutes++;
        seconds = 0;
    }
    if (minutes >= 60) {
        hours++;
        minutes = 0;
    }
    var m=minutes<10?("0"+minutes):minutes;
    var s=seconds<10?"0"+seconds:seconds;
    var h=hours<10?"0"+hours:hours;
    document.getElementById("recordingTime").innerHTML = h+ ":" +m+ ":" + s+suffex;
    if (counting) {
        seconds++;
        setTimeout(timer, 1000);
    }
}

function stopTimer(){
    counting=false;
    document.getElementById("time").style.visibility='hidden';
    setTimeout(() => {
        document.getElementById("recordingTime").innerHTML=" ";
    }, 1000);
    seconds=0;
    hours=0,minutes=0;
}
function stopRecord() {
    var startButton=document.getElementById("start-recording");
    startButton.removeAttribute("record");
    startButton.setAttribute("record", "true");
    startButton.style.visibility='visible';
    document.getElementById("stop-recording").style.visibility='hidden';
    document.getElementById("play-recording").style.visibility = 'visible';
    timeIntervals=[];
    var recordingLength=document.getElementById("recordingTime").innerHTML;
    localStorage.setItem("recordingTime",recordingLength);
    stopTimer();
    document.getElementById("comment").innerHTML="You had recorded "+recordingLength+" clip";
    //window.alert("Record saved sucessfully");
}

var canIPlay;
var pauseIndex,musicSounds,intervals;
var seconds=0, minutes=0, hours=0;

function playRecorded() {
    document.getElementById('start-recording').style.visibility='hidden';
    document.getElementById("play-recording").style.visibility = 'hidden';
    document.getElementById("pause").style.visibility='visible';
    document.getElementById("stop").style.visibility="visible";
    canIPlay=true;
    counting=true;
    document.getElementById("time").style.visibility='visible';
    suffex="/"+localStorage.getItem("recordingTime");
    timer();
    play();
}

function pause(){
    document.getElementById("resume").style.visibility="visible";
    document.getElementById("pause").style.visibility="hidden";
    canIPlay=false;
    counting=false;
}

function resume(){
    document.getElementById("resume").style.visibility="hidden";
    document.getElementById("pause").style.visibility="visible";
    canIPlay=true;
    counting=true;
    timer();
    play(musicSounds,intervals,pauseIndex);
}

function stop(){
    canIPlay=false;
    stopTimer();
    document.getElementById("stop").style.visibility="hidden";
    document.getElementById("resume").style.visibility="hidden";
    document.getElementById("pause").style.visibility="hidden";
    document.getElementById("start-recording").style.visibility = 'visible';
    document.getElementById("play-recording").style.visibility = 'visible';
}

function play(musicSounds, intervals, index){
    if (canIPlay) {
        musicSounds = musicSounds || JSON.parse(localStorage.getItem("sounds-data"));
        intervals = intervals || JSON.parse(localStorage.getItem("sound-intervals"));
        index = index || 0;
        if (index > musicSounds.length - 1) {
            document.getElementById("start-recording").style.visibility = 'visible';
            document.getElementById("play-recording").style.visibility = 'visible';
            document.getElementById("stop").style.visibility="hidden";
            document.getElementById("pause").style.visibility="hidden";
            stopTimer();
            suffex=null;
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