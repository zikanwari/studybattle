var username;
var istrain;

changetime();

function changetime() {
    username = localStorage.getItem('user');
    istrain = localStorage.getItem('istrain');
    document.getElementById("timer").classList.add("select");
    fetch(`timer/index.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('timetable').innerHTML = data;
        syncdata();
    });
}

function changeother() {
    document.getElementById("timer").classList.remove("select");
    document.getElementById("ranking").classList.remove("select");
    document.getElementById("other").classList.add("select");
    fetch(`other/index.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('timetable').innerHTML = data;
        startmoni();
    });
}

function changetodo() {
    document.getElementById("timer").classList.remove("select");
    document.getElementById("other").classList.remove("select");
    document.getElementById("ranking").classList.add("select");
    fetch(`ranking/index.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('timetable').innerHTML = data;
        taskupdate();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("other").onclick = function() {
        console.log("otherclieked");
        changeother();
        console.log('other');
    }

    document.getElementById("ranking").onclick = function() {
        console.log("tankingclieked");
        changetodo();
        console.log('todo');
    }

    document.getElementById("timer").onclick = function() {
        console.log("timerclieked");
        document.getElementById("other").classList.remove("select");
        document.getElementById("ranking").classList.remove("select");
        changetime();
        console.log('timer');
    }
});