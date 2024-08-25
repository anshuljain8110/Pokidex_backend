const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');
const Apifeatures = require('../utils/Apifeatures');

// Create a new Pokémon
router.post('/pokemons', async (req, res) => {
  try {
    const newPokemon = await Pokemon.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newPokemon
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
});

// Get all Pokémon (sorted by ID by default)
router.get('/pokemons', async (req, res) => {
  try {
    const apiFeatures = new Apifeatures(Pokemon.find(), req.query)
      .filter()      // Apply filters
      .sort()        // Default sort by ID
      .limitFields() // Limit fields
      .paginate();  // Apply pagination

    const pokemons = await apiFeatures.query.exec();
    const totalCollections = await Pokemon.countDocuments();
    res.status(200).json({
      status: 'success',
      totalPages: Math.ceil(totalCollections / (req.query.limit || 10)),
      data: pokemons
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get Pokémon by name or ID
router.get('/pokemons/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ 'name.english': req.params.id }) || await Pokemon.findById(req.params.id);
    if (!pokemon) {
      return res.status(404).json({
        status: 'fail',
        message: 'Pokémon not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: pokemon
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
