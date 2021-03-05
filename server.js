console.log('May Node be with you')

const MongoClient = require('mongodb').MongoClient;

const express = require('express');
const bodyParser= require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
    console.log('listening on 3000')
  })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
     //Note: __dirname is the current directory you're in.
    })

app.post('/quotes', (req, res) => {
    console.log(req.body)
  })

  MongoClient.connect("mongodb+srv://ozarate:a2d1bf7211@cluster0.a1jwj.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('gym-server')
    //app.use(/* ... */)
    //app.get(/* ... */)
    //app.post(/* ... */)
    //app.listen(/* ... */)
  })
  .catch(error => console.error(error))