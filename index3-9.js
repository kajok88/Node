// Tässä tiedostossa kaikki FullStackOpen osa 3. tehtävät 3.9 asti.

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));
app.use(express.json());
app.use(cors())


morgan.token('postData', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});


app.get('/info', (req, res) => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0;
  res.send(`Phonebook has info for ${maxId} people <br /> ${Date()}`);
});


app.get('/persons', (req, res) => {
  res.json(persons);
});


app.get('/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.put('/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const personIndex = persons.findIndex(person => person.id === id);

  if (personIndex) {
    const person = persons[personIndex];
    const body = request.body;

    const updatedPerson = {
      ...person,
      number: body.number,
    };

    persons = persons.map((p, index) => (index === personIndex ? updatedPerson : p));
    response.json(updatedPerson);
  } else {
    response.status(404).end();
  }
});


app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});


app.post('/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' });
  }
  const existingPerson = persons.find(person => person.name === body.name);
  if (existingPerson) {
    return response.status(400).json({ error: 'Name must be unique' });
  }
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0;
    return maxId + 1;
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  
  persons = persons.concat(person);
  response.json(person);
});


const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


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
];