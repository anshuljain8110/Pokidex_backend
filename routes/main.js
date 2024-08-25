const express = require('express')
const router = express.Router()
const Pokemon = require('../models/Pokemon');

router.get('/pokemons', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  try {
    const totalCollections = await Pokemon.countDocuments()
    const pokemons = await Pokemon.find().skip(skip).limit(limit);
    res.status(200).json({status:"success",totalPages:Math.floor(totalCollections/20)+1,data:pokemons});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


module.exports = router