const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  res.send(`Phonebook has info for ${maxId} people <br /> ${Date()}`)
  
})

app.get('/persons', (req, res) => {
  res.json(persons)
})

app.get('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {    
    response.json(person)  
  } else {    
    response.status(404).end()  
  }
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/persons', (request, response) => {
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' })
  }

  const existingPerson = persons.find(person => person.name === body.name);
  if (existingPerson) {
    return response.status(400).json({ error: 'Name must be unique' });
  }

  const person = {
    name: body.name || null,
    number: body.number || null,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})





let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
  ]