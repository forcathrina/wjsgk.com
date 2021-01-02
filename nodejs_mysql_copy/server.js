const express = require('express');
const app = express();

const bodyParser = require('body-parser');
 
global.__basedir = __dirname;

const db = require('./app/config/db.config.js');

const router = require('./app/routers/router.js');


app.use(bodyParser.json());

//>?????
app.use(express.static('resources'));

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
//?????


app.use('/', router);



// Create a Server
const server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})


db.sequelize.sync()
