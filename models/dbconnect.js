const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://anshuljain8110:eeeeeeeeeeee@cluster0.7ywbtsi.mongodb.net/pokedex?retryWrites=true&w=majority');
    console.log(`DB Connected`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
