const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const connectionString = 'mongodb+srv://user:1234@cluster0.xrdxf.mongodb.net/Cluster0?retryWrites=true&w=majority'

const app = express();
const port = 3000

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('mydatabase')

    const quotesCollection = db.collection('mpcollection')

    app.set('view engine', 'ejs')

    app.use(express.static(__dirname + '/views'))
    app.use(express.static(__dirname + '/public'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())


    app.listen(port, () => {
      console.log('app listening at localhost', { port })
    })

    app.get('/', (req, res) => {
      quotesCollection.find().toArray()
        .then(results => {
          res.render('index.ejs', { quotes: results })
        })
        .catch(error => console.error(error))
    })

    app.post('/create', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          console.log(req.body)
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.post('/delete', function (req, res, next) {
      var userId = req.body.userId

      quotesCollection.deleteOne(
        { "_id": ObjectId(userId) }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            console.log(userId)
          }
          res.sendStatus(200)
        })
        .catch(error => console.error(error))
    })

    app.post('/update', function (req, res, next) {
      var userId =  req.body.userId
      var userQuote = req.body.userQuote

      quotesCollection.updateOne(
        { "_id": ObjectId(userId) },
        {$set: {"quote": userQuote}}
      )
        .then(result => {
          if (result.deletedCount === 0) {
            console.log(userId)
          }
          res.sendStatus(200)
        })
        .catch(error => console.error(error))
    })



  })
  .catch(error => console.error(error))