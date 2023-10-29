var username = localStorage.getItem('user');
var istrain = localStorage.getItem('istrain');

function update() {

  /*fetch(`https://api.launchpencil.f5.si/studybattle/detail/?user=` + username, {
    mode: 'cors'
  })
  .then(response => response.text())
  .then(data => {
          a = data.split(',');
          if (a[0] == "エラー") {
              if (a[1].startsWith("Access denied for user") || a[1].endsWith("doesn't exist")) {
                  document.getElementById('timetable').innerText = 
                      '認証に失敗しました。ユーザー名が設定されていません。';
                      return;
              }
              document.getElementById('timetable').innerText = '学習時間の取得に失敗しました。\n エラーメッセージ：' + a[1];
              return;
          }
          a.pop();
          if (a[0] == '0000-00-00 00:00:00') {
            document
          }
  })
  .catch(error => {
      document.getElementById('timetable').innerText = '時間割のデータ取得に失敗しました。';
  });*/
}

function syncdata() {

  fetch(`https://api.launchpencil.f5.si/studybattle/detail?username=` + username, {
    //mode: 'cors'
  })
  .then(response => response.text())
  .then(data => {
          a = data.split(',');
          if (a[0] == "error") {
              if (a[1] == "user not found") {
                console.log('user not found');
              }
              document.getElementById('time').innerText = 'error';
              return;
          }
          a.pop();
          document.getElementById('time').innerText = 'time';
  })
  .catch(error => {
      document.getElementById('time').innerText = 'タスクのデータ取得に失敗しました。';
      console.log(error);
  });
}