const express = require('express');
const PizzaOptions = require('../models/Pizza');

const router = express.Router();

// GET pizza building options
router.get('/options', async (req, res) => {
  try {
    let options = await PizzaOptions.findOne();

    // If no options exist yet in the database, create default ones
    if (!options) {
      options = new PizzaOptions();
      await options.save();
    }

    res.status(200).json(options);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;