const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const email = 'admin@pizza.com';
  const hashed = await bcrypt.hash('Admin1234', 10);

  const existing = await User.findOne({ email });
  if (existing) {
    existing.password = hashed;
    existing.role = 'admin';
    await existing.save();
    console.log('Admin updated');
  } else {
    await User.create({ name: 'Admin', email, password: hashed, role: 'admin' });
    console.log('Admin created');
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});