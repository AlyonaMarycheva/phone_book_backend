require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.static('build'))
let now = new Date()

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]


app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

app.post('/api/persons', (req, res) =>{
  const newPerson = req.body

  if (!newPerson.name || !newPerson.number) 
    return res.status(400).json({error: "name or number missing"})
  
  if (persons.findIndex((person) => person.name === newPerson.name) !== -1)
    return res.status(400).json({error: "this name already exists in phonebook"})
  
  const person = new Person ({
    name: newPerson.name,
    number: newPerson.number
  })

  person.save().then(savedNote => res.json(savedNote))
})


app.get('/info', (req, res) => {
  res.send(
    `<div>Phonebook has info about ${persons.length} people<div>
     <div>${now}<div>`
    )
  }
)

app.get('/api/persons/:id', (req, res) => {
  id = Number(req.params.id)
  person = persons.find(person => person.id === id)
  if (person) 
    res.json(person)
  else 
    res.status(404).end()
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).end())
  .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Сервер запущен на ${PORT})`))

