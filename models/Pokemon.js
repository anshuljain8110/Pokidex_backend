const mongoose = require('mongoose');

// Define the Pokémon schema
const pokemonSchema = new mongoose.Schema({
  id: Number,
  name: {
    english: String,
    japanese: String,
    chinese: String,
    french: String,
  },
  type: [String],
  base: {
    HP: Number,
    Attack: Number,
    Defense: Number,
    "Sp. Attack": Number,
    "Sp. Defense": Number,
    Speed: Number,
  },
  species: String,
  description: String,
  evolution: {
    next: [[String, String]]
  },
  profile: {
    height: String,
    weight: String,
    egg: [String],
    ability: [[String, Boolean]],
    gender: String,
  },
  image: {
    sprite: String,
    thumbnail: String,
    hires: String,
  },
}, { collection: 'pokemons' }); // Ensure you specify the collection name if it's different

// Create the Pokémon model
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
