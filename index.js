const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

let pins = []; 

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));
app.use(express.json());
app.use(cors());

morgan.token('postData', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});

const generateId = () => {
  const maxId = pins.length > 0
    ? Math.max(...pins.map(n => n.id))
    : 0
  return maxId + 1
}


app.get('/pins', (req, res) => {
  res.json(pins);
});
app.get('/pinCount', (req, res) => {
  const maxId = pins.length > 0
    ? Math.max(...pins.map(n => n.id))
    : 0;
  res.send(`${maxId} Pins saved!`);
});
app.get('/pins/:id', (req, res) => {
  const id = Number(req.params.id);
  const pin = pins.find(pin => pin.id === id);
  if (pin) {
    res.json(pin);
  } else {
    res.status(404).end();
  }
});


app.put('/pins/:id', (req, res) => {
  const id = Number(req.params.id);
  const pinIndex = pins.findIndex(pin => pin.id === id);

  if (pinIndex) {
    const pin = pins[pinIndex];
    const body = req.body;
    const updatedPin = {
      ...pin,
      title: body.title,
    };

    pins = pins.map((p, index) => (index === pinIndex ? updatedPin : p));
    res.json(updatedPin);
  } else {
    res.status(404).end();
  }
});


app.post('/pins', (req, res) => {
const body = req.body

  if (!body.title || !body.coordinates) {
      return res.status(400).json({ 
      error: 'title or coordinates missing' 
      })
  }
  const pin = {
    id: generateId(),
    pinType: body.pinType,
    title: body.title,
    coordinates: body.coordinates
  }
  pins = pins.concat(pin)
  res.json(pin)
})


app.delete('/pins/:id', (req, res) => {
  const id = Number(req.params.id);
  pins = pins.filter(pin => pin.id !== id);
  res.status(204).end();
});


const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
