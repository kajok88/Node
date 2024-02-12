const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Pin = require('./models/pin')

const PORT = 3004;

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));
app.use(express.json());
app.use(cors());

morgan.token('postData', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});


app.get('/api/pins', async (req, res) => {
  try {
    const pins = await Pin.find();
    res.json(pins);
  } catch (error) {
    console.error('Error fetching pins:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/pinCount', async (req, res) => {
  try {
    const count = await Pin.countDocuments();
    res.send(`${count} Pins saved!`);
  } catch (error) {
    console.error('Error counting pins:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/pins/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const pin = await Pin.findById(id);
    if (pin) {
      res.json(pin);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error('Error fetching pin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.put('/api/pins/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedPin = await Pin.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedPin) {
      res.json(updatedPin);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error('Error updating pin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/pins', async (req, res) => {
  try {
    const pinData = req.body;
    // Add timestamp using getCurrentDate function
    pinData.date = getCurrentDate();
    const pin = new Pin(pinData);
    const savedPin = await pin.save();
    res.json(savedPin);
  } catch (error) {
    console.error('Error saving pin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// To get the current date, only in YYYY-MM-DD
const getCurrentDate = () => {
  return new Date().toISOString().slice(0, 10); 
};


app.delete('/api/pins/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Pin.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting pin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
