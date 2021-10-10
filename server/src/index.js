const express = require('express');
const mySql = require('mysql2');
const cors = require('cors');
const passport  = require('passport');
require('./app/components/shared/models');
const bodyParser = require('body-parser');

const routing = require('./app/routes');
const config = require('./config/app');
require('./app/auth/passport');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routing());

const appPort = config.appPort;

const connection = mySql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password
});

connection.connect(function (err) {
    if (err) {
        console.log(`Error connecting to ${config.host}`, err)
    } else {
        connection.query("CREATE DATABASE if not exists usersSystem", function (err, result) {
            if (err) {
                console.log(`Error creating database usersSystem`, err)
            } else {
                console.log("Database created");
                app.listen(appPort, () => console.log(`Listen on port: ${appPort}`));
            }
        });
    }
});