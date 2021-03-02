console.log('May Node be with you')

const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
    console.log('listening on 3000')
  })

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    // Note: __dirname is the current directory you're in.
  })

  app.post('/quotes', (req, res) => {
    console.log(req.body)
  })