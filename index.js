const dotenv = require('dotenv')
dotenv.config()

const mysql_connection = require('./mysql_con')
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  var statusCode = 0;
  var response = '';

  var sql = 'SELECT * FROM codes';
  mysql_connection.query(sql, function (error, results, fields) {
    if (error) {
      statusCode = 400;
      response = error;
    } else {
      statusCode = 200;
      response = results;
    };
    return res.type('json').status(statusCode).send(response);
  })  
})

app.get('/:code', function (req, res) {
  var {code} = req.params;
  var statusCode = 0;
  var response = '';

  var sql = `SELECT * FROM codes WHERE codigo = "${code}"`;
  mysql_connection.query(sql, function (error, results, fields) {
    if (error) {
      statusCode = 400;
      response = error;
    } else {
      statusCode = 200;
      response = results;
    };
    return res.type('json').status(statusCode).send(response);
  });
});

app.get('/:id', function (req, res) {
  var {id} = req.params;
  var statusCode = 0;
  var response = '';

  var sql = `SELECT * FROM codes WHERE id = "${id}"`;
  mysql_connection.query(sql, function (error, results, fields) {
    if (error) {
      statusCode = 400;
      response = error;
    } else {
      statusCode = 200;
      response = results;
    };
    return res.type('json').status(statusCode).send(response);
  });
});

app.post('/', function (req, res) {
  const { codigo } = req.body;
  var statusCode =  0;
  var response = '';

    var sql = `INSERT INTO codes (id, codigo, created_at) VALUES (NULL, '${codigo}', CONVERT_TZ(current_timestamp(), '-0:00', '-3:00'))`;
    mysql_connection.query(sql, function (error, results, fields) {
      statusCode = 200;
      response = results;
      if (error) {
        statusCode = 400;
        response = error;
      };
      return res.type('json').status(statusCode).send(response);
    });
})

app.put('/:id', function (req, res) {
  var {id} = req.params;
  var {codigo} = req.body;
  var statusCode = 0;
  var response = '';

  var sql = `UPDATE codes SET codigo = "${codigo}", updated_at = CONVERT_TZ(current_timestamp(), '-0:00', '-3:00') WHERE id = "${id}"`;
  mysql_connection.query(sql, function (error, results, fields) {
    if (error) {
      statusCode = 400;
      response = error;
    } else {
      statusCode = 200;
      response = results;
    };
    return res.type('json').status(statusCode).send(response);
  });
});

app.delete('/:codigo', function (req, res) {
  var {codigo} = req.params;
  var {newCode} = req.body;
  var statusCode = 0;
  var response = '';

  var sql = `DELETE FROM codes WHERE codigo = "${codigo}"`;
  mysql_connection.query(sql, function (error, results, fields) {
    if (error) {
      statusCode = 400;
      response = error;
    } else {
      statusCode = 200;
      response = results;
    };
    return res.type('json').status(statusCode).send(response);
  });

});

// app.delete('/', function (req, res) {
//   var statusCode = 0;
//   var response = '';

//   var sql = `DELETE FROM codes`;
//   mysql_connection.query(sql, function (error, results, fields) {
//     if (error) {
//       statusCode = 400;
//       response = error;
//     } else {
//       statusCode = 200;
//       response = results;
//     };
//     return res.type('json').status(statusCode).send(response);
//   });
// });



app.listen(3001);
console.log("Running at http://localhost:3001/");