const mongoose = require('mongoose');

const pizzaOptionsSchema = new mongoose.Schema({
  bases: {
    type: [String],
    default: ['Thin Crust', 'Thick Crust', 'Cheese Burst', 'Whole Wheat', 'Gluten Free']
  },
  sauces: {
    type: [String],
    default: ['Tomato', 'BBQ', 'Pesto', 'Alfredo', 'Spicy Chipotle']
  },
  cheeses: {
    type: [String],
    default: ['Mozzarella', 'Cheddar', 'Parmesan', 'Vegan Cheese']
  },
  vegetables: {
    type: [String],
    default: ['Onion', 'Capsicum', 'Mushroom', 'Olives', 'Sweet Corn', 'Tomato']
  },
  stock: {
    bases: { type: Map, of: Number, default: {} },
    sauces: { type: Map, of: Number, default: {} },
    cheeses: { type: Map, of: Number, default: {} },
    vegetables: { type: Map, of: Number, default: {} }
  }
});

module.exports = mongoose.model('PizzaOptions', pizzaOptionsSchema);