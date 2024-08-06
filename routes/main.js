const express = require('express')
const router = express.Router()
const Pokemon = require('../models/Pokemon');

router.get('/pokemons', async (req, res) => {
    try {
      const pokemons = await Pokemon.find(); // Fetch all Pokémon from the database
      res.status(200).json(pokemons); // Send the Pokémon data as JSON
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

module.exports = router