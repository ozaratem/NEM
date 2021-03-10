console.log('May Node be with you')

const MongoClient = require('mongodb').MongoClient;

const express = require('express');
const bodyParser= require('body-parser');
const app = express();


app.listen(3000, function() {
  console.log('listening on 3000')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())

//app.get(endpoint, callback)

//app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html')
     //Note: __dirname is the current directory you're in.
    //})

//app.post('/quotes', (req, res) => {
  //console.log(req.body)
//})    

MongoClient.connect("mongodb+srv://ozarate:a2d1bf7211@cluster0.a1jwj.mongodb.net/gym-logs?retryWrites=true&w=majority",
 { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
  const db = client.db('gym-logs')
  const quotesCollection = db.collection('quotes')

  app.set('view engine', 'ejs')

  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })
  
  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
      .then(results => {
        res.render('index.ejs', { quotes: results })
      })
      .catch(error => console.error(error))
  })
  
  app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(
      { name: 'Yoda' },
      {
        $set: {
          name: req.body.name,
          quotes: req.body.quotes
        }
      },
      {
        upsert: true
      })
      .then(result => {res.json('Success')})
      .catch(error => console.error(error))
    
  })

  app.delete('/quotes', (req, res) => {
    // Handle delete event here
    quotesCollection.deleteOne(
      { name: req.body.name }
    )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No quote to delete')
        }
        res.json(`Deleted Darth Vadar's quote`)})
      .catch(error => console.error(error))
  })

})

.catch(error => console.error(error))


