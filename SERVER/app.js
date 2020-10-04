'use strict';

const express = require('express');
const app = express();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "mysql",
    password: "sa201603191",
    database: "tp8"
});

const PORT = 80;
const HOST = '0.0.0.0';

var connected = false;

app.get('/', (req, res) =>
{
    if (!connected)
    {
        con.connect(function (err)
        {
            if (err) throw err;
            console.log("Conexion realizada");
            var sql = "CREATE TABLE datos (id INT NOT NULL AUTOINCREMENT PRIMARY KEY, time DATETIME NOT NULL);";
            con.query(sql, function (err, result)
            {
                if (err) throw err;
                console.log("Tabla inicializada");
            });
        });
    }
    con.query('INSERT INTO datos (NOW());', function (err, rows, fields)
    {
        if (err) throw err;
        console.log('Fila insertada');
        con.query('SELECT * from datos;', function (err, rows, fields)
        {
            if (err) throw err;
            res.json(rows);
        });
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);