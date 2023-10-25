changetime();

function changetime() {
    document.getElementById("timer").classList.add("select");
    fetch(`timer/index.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('timetable').innerHTML = data;
        syncdata();
    });
}

function changeother() {
    document.getElementById("time").classList.remove("select");
    document.getElementById("todo").classList.remove("select");
    document.getElementById("other").classList.add("select");
    fetch(`other/index.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('timetable').innerHTML = data;
        startmoni();
    });
}

function changetodo() {
    document.getElementById("time").classList.remove("select");
    document.getElementById("other").classList.remove("select");
    document.getElementById("todo").classList.add("select");
    fetch(`ranking/index.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('timetable').innerHTML = data;
        startmoni_todo();
    });
}

document.getElementById("other").onclick = function() {
    changeother();
    console.log('other');
}

document.getElementById("ranking").onclick = function() {
    changetodo();
    console.log('todo');
}

document.getElementById("timer").onclick = function() {
    document.getElementById("other").classList.remove("select");
    document.getElementById("todo").classList.remove("select");
    changetime();
    console.log('timer');
}