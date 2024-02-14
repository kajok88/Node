const mongoose = require('mongoose');

const password = process.argv[2]; // Get password as a command line argument
if (process.argv.length<3) {
  console.log('Give password as argument')
  process.exit(1)
};

const url =
  `mongodb+srv://ReactHT:${password}@locationweatheranddata.acrawin.mongodb.net/LocationWeatherAndData?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err, '\nCheck your password \nExiting...');
    process.exit(1);    // Close the  application if an error occurs during connection
  });


const pinSchema = new mongoose.Schema({
  pinType: String,
  title: { type: String, required: true, unique: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  date: String
});
pinSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

module.exports = mongoose.model('Pin', pinSchema);