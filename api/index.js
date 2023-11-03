const mysql = require('mysql2');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  console.log(req.url)
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  const queryObject = url.parse(req.url, true).query;
  const username = process.env.user;
  const password = process.env.pass;

  const connection = mysql.createConnection({
    host: '192.168.0.3',
    user: username,
    password: password,
    database: 'studyattack'
  });

  if (req.url.startsWith('/studybattle/register')) {
    connection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.message);
        res.end('エラー,' + err.message);
        return;
      }

      const sql = "INSERT INTO data (user, study, studyweek, maxrank, train, isstudying) VALUES ('" + queryObject.username + "', 0, 0, 0, " +  queryObject.istrain + ", 0);";

      connection.query(sql, (err, results, fields) => {
          if (err) {
              console.error('error querying: ' + err.stack);
              res.write('エラー,' + err.message);
              return;
          }

          res.write('registered')

          connection.end();
          res.end();
      });
    });
  } else if (req.url.startsWith('/studybattle/start')) {
    connection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.message);
        res.end('エラー,' + err.message);
        return;
      }

      const sql = "UPDATE data SET isstudying = ? WHERE user = ?;";
      const params = [getnow(), queryObject.username];

      connection.query(sql, params, (err, results, fields) => {
          if (err) {
              console.error('error querying: ' + err.stack);
              res.write('エラー,' + err.message);
              return;
          }

          res.write(getnow())

          connection.end();
          res.end();
      });
    });
  } else if (req.url.startsWith('/studybattle/detail')) {

    connection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.message);
        res.end('エラー,' + err.message);
        return;
      }

      const sql = "SELECT * FROM data";

      connection.query(sql, (err, results, fields) => {
          if (err) {
              console.error('error querying: ' + err.stack);
              res.write('エラー,' + err.message);
              return;
          }

          var userdatails = searchuser(queryObject.username, results);
          if (userdatails == 'user not found') {
            console.log('not found:' + username);
            res.write('error,user not found')
          } else {
            console.log(userdatails.isstudying);
            res.write(userdatails.isstudying + "," + userdatails.study + "," + userdatails.studyweek + "," + userdatails.maxrank)
          }

          connection.end();
          res.end();
      });
    });

  } else if (req.url.startsWith('/studybattle/stop')) {
    connection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.message);
        res.end('エラー,' + err.message);
        return;
      }

      const sql = "UPDATE data SET isstudying = '0000-00-00 00:00:00', studyweek = studyweek + ?, study = study + ? WHERE user = ?;";
      const params = [queryObject.score, queryObject.score, queryObject.username];

      connection.query(sql, params, (err, results, fields) => {
          if (err) {
              console.error('error querying: ' + err.stack);
              res.write('エラー,' + err.message);
              return;
          }

          res.write(getnow())

          connection.end();
          res.end();
      });
    });
  } else {
    
    
    //Here is ranking


    connection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.message);
        res.write('エラー,' + err.message);
        return;
      }
  
      const sql = "SELECT * FROM data ORDER BY `study` DESC";
  
      connection.query(sql, (err, results, fields) => {
          if (err) {
              console.error('error querying: ' + err.stack);
              res.write('エラー,' + err.message);
              return;
          }

          for (let i = 0; i < results.length; i++) {
            res.write(results[i].user + ',' + results[i].study + ',');
          }

          connection.end();
      });
    })
    res.write('fight!')
    res.end();

}});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});


function searchuser(targetuser, results) {
  for (let i = 0; i < results.length; i++) {
    if (results[i].user === targetuser) {
      return results[i];
    }
  }
  return 'user not found';
}

function getnow() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
