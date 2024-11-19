const timerInterval = setInterval(whiledata, 1000);

let hasdata = false;

function syncdata() {
  document.getElementById('start').addEventListener('click', function() {
    if (document.getElementById('time').innerText == 'error' || document.getElementById('time').innerText == 'NaN:NaN') {
      console.log('startable');

      fetch(`https://api.launchpencil.f5.si/studybattle/start?username=` + username, {
        //mode: 'cors'
      })
      .then(response => response.text())
      .then(data => {
              alert(data);
      })
      .catch(error => {
          alert('タイマーの開始に失敗しました。')
          console.log(error);
      });

    } else {
      alert('既にタイマーが進行中です')
    }
  });

  document.getElementById('stop').addEventListener('click', function() {
    if (document.getElementById('time').innerText == 'error' || document.getElementById('time').innerText == 'NaN:NaN') {
      alert('タイマーが開始されていません');
    } else {
      console.log('stoppable');

      var score = document.getElementById('time').innerText.match(/\d{2}(?=:)/)[0];

      fetch(`https://api.launchpencil.f5.si/studybattle/stop?username=` + username + `&score=` + score, {
        //mode: 'cors'
      })
      .then(response => response.text())
      .then(data => {
              alert(data);
      })
      .catch(error => {
          alert('タイマーの停止に失敗しました。')
          console.log(error);
      });
    }
  });
}

function whiledata() {

  fetch(`https://api.launchpencil.f5.si/studybattle/detail?username=` + username, {
    //mode: 'cors'
  })
  .then(response => response.text())
  .then(data => {
          a = data.split(',');
          if (a[0] == "error") {
              if (a[1] == "user not found") {
                console.log('[timer.js] user not found');
              }
              document.getElementById('time').innerText = 'error';
              return;
          }
          a.pop();
          updateTimer(a[0])
  })
  .catch(error => {
      document.getElementById('time').innerText = 'タスクのデータ取得に失敗しました。';
      console.log(error);
  });
}

function updateTimer(startTime) {
  // 現在の時刻を取得
  const currentTime = new Date();

  // 開始時刻からの経過時間を計算
  const elapsedTime = new Date(currentTime - new Date(startTime));

  // 分と秒を取得
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');

  // タイマーの表示形式を設定（例：mm:ss）
  document.getElementById('time').innerText = `${minutes}:${seconds}`;
}