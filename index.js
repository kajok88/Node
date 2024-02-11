const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

let pins = [
    {
    id: 1,    
    pinType: 1,    
    title: "nice",    
    coordinates: {
        capLat: 60.17, 
        capLng: 24.93
        }
    }
]; 

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));
app.use(express.json());
app.use(cors());

morgan.token('postData', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});

// Endpoint to get all saved pins
app.get('/pins', (req, res) => {
  res.json(pins);
});

// Endpoint to save a new pin
app.post('/pins', (req, res) => {
  const pinData = req.body;

  if (!pinData.title || !pinData.coordinates) {
    return res.status(400).json({ error: 'Name or coordinates missing' });
  }

  pins.push(pinData); // Add the new pin data to the pins array
  res.json(pinData); // Return the saved pin data
});

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
