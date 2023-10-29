var username = localStorage.getItem('user');
var password = localStorage.getItem('pass');


function taskupdate() {
  /*
  var username = localStorage.getItem('user');
  var password = localStorage.getItem('pass');

  fetch(`https://api.launchpencil.f5.si/todo/?user=` + username + '&pass=' + password, {
    mode: 'cors'
  })
  .then(response => response.text())
  .then(data => {
          a = data.split(',');
          if (a[0] == "エラー") {
              if (a[1].startsWith("Access denied for user") || a[1].endsWith("doesn't exist")) {
                  document.getElementById('timetable').innerText = 
                      '認証に失敗しました。ユーザー名またはパスワードが間違っているか設定されていません。';
                      setTimeout(function() {
                        if (confirm('ユーザー名またはパスワードが間違っているか設定されていません。\nOKを押すと設定画面へ移動します。')) {
                          changeother();
                        }
                      }, 100);
                      return;
              }
              document.getElementById('timetable').innerText = 'タスクのデータ取得に失敗しました。\n エラーメッセージ：' + a[1];
              return;
          }
          a.pop();
          for (let index = 0; index < a.length; index++) {
            var newElement = document.createElement("div");
            newElement.innerHTML = '<div>' + a[index] + '</div>';
            
            document.getElementsByClassName("table")[0].appendChild(newElement);
          }
  })
  .catch(error => {
      document.getElementById('timetable').innerText = 'タスクのデータ取得に失敗しました。';
  });
  */
}