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

  if (req.url.startsWith('/studyattack/register')) {
    connection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.message);
        res.end('エラー,' + err.message);
        return;
      }

      const sql = "INSERT INTO data (user, study, studyweek, maxrank, train, isstudying) VALUES ('" + uername + "', 0, 0, null, " +  istrain + ", false);";

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
  } else if (req.url.startsWith('/studyattack/start')) {
    
  } else if (req.url.startsWith('/studyattack/detail')) {
    
    var userdatails = getuser("username");
    if (!userdatails.isstudying) {
      
    }

    res.end();

  } else if (req.url.startsWith('/studyattack/stop')) {
    
  } else {
    
    var userdatails = getuser("username");
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
}

function getuser(username) {
  connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.message);
      res.write('エラー,' + err.message);
      return;
    }

    const sql = "SELECT * FROM data";

    connection.query(sql, (err, results, fields) => {
        if (err) {
            console.error('error querying: ' + err.stack);
            res.write('エラー,' + err.message);
            return;
        }
        connection.end();

        return searchuser(username, results);
    });
  })
}