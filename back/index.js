const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const database = "empleos_react";
const user = "root";
const host = "localhost";
const password = "";

const db = mysql.createConnection({
    host,
    user,
    password,
    database,
});

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log('Listening on port 3001');
});

app.get('/', (req, res) => {
    res.send({ status: 200 });
});

app.post('/company', (req, res) => {
    const { company, username, email, password, logo } = req.body;
    db.query(
        'INSERT INTO company (company, username, email, password, logo) VALUES (?, ?, ?, md5(?), ?)',
        [company, username, email, password, logo],
        (err, result) => {
            if (err) {
                res.status(400).send({ message: err });
            } else {
                res.status(201).send({
                    status: 201,
                    message: 'Empresa creada con éxito',
                    data: result
                });
            }
        }
    );
});
