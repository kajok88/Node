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

app.get('/pins', (req, res) => {
  res.json(pins);
});

const generateId = () => {
    const maxId = pins.length > 0
      ? Math.max(...pins.map(n => n.id))
      : 0
    return maxId + 1
}

app.post('/pins', (request, response) => {
const body = request.body

  if (!body.title || !body.coordinates) {
      return response.status(400).json({ 
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
  response.json(pin)
})


const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
