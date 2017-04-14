const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const md5 = require('md5')
const fs = require('fs')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.get('/api/v1/items', (request, response) => {
  database('items').select()
  .then((items) => {
    response.status(200).json(items)
  })
  .catch((error) => {
    response.status(404).json({'Response 404': 'Not Found'})
  })
})

app.get('/api/v1/sorted_items', (request, response) => {
  database('items').select()
  .then((items) => {
    const sortedItems = items.sort((a, b) => {
      const aCode = a.name.split('')[0].charCodeAt()
      const bCode = b.name.split('')[0].charCodeAt()
      return aCode > bCode
    })

    response.status(200).json(sortedItems)
  })
  .catch((error) => {
    response.status(404).json({'Response 404': 'Not Found'})
  })
})

app.post('/api/v1/items', (request, response) => {
  const { name, reason, cleanliness } = request.body
  const item = { name, reason, cleanliness }
  database('items').insert(item)
  .then(function() {
    database('items').select()
      .then(function(items) {
        response.status(201).json(items)
      })
      .catch(function(error) {
        response.status(422).json({'Response 422': 'Unprocessable Entity'})
      });
  })
})
app.get('/api/v1/items/:id', (request, response)=> {
  const { id } = request.params
    database('items').where('id', id).select().del()
    .then(function(count) {
      if (count === 0) {
        response.status(422).json({'Response 422': 'Unprocessable Entity'})
      } else {
        response.status(200).json({'Response 200': 'OK' })
      }
    })
})

app.listen(app.get('port'), () => {
  console.log(`Running on ${app.get('port')}`)
})
