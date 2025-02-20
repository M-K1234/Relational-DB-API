const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const multer = require('multer');
const mysqlRouter = require('./routes/mysql/mysqlRoutes')
const mongoRouter = require('./routes/mongodb/mongoRoutes');
const neo4j = require('./routes/neo4j/neoTest');

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({urlencoded: false}));
// app.use(multer().none());
app.use(mysqlRouter);
app.use(mongoRouter);
app.use(neo4j);


app.listen(3000, ()=>{
    console.log('App running')
})