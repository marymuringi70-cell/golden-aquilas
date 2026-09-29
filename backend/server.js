const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import Models
const Ticket = require('./models/Ticket');
const Property = require('./models/Property');
const User = require('./models/User');

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/goldenaquilas')
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// --- ROUTES ---

// 1. Get All Tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Create Ticket (with photo upload)
app.post('/api/tickets', upload.single('photo'), async (req, res) => {
  try {
    const { category, description, property, unit, guest } = req.body;
    const photoUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '';
    const newTicket = new Ticket({
      id: `TICK-${Math.floor(100 + Math.random() * 900)}`,
      category,
      description,
      property,
      unit,
      guest,
      photoUrl,
      status: 'Pending'
    });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Update Ticket Status
app.patch('/api/tickets/:id', async (req, res) => {
  try {
    const updated = await Ticket.findOneAndUpdate(
      { id: req.params.id },
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get All Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Add New User
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, role, phone } = req.body;
    const newUser = new User({ name, email, role, phone });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Get All Properties
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Seed Initial Properties
app.post('/api/properties/seed', async (req, res) => {
  try {
    await Property.deleteMany({});
    const sampleProperties = [
      {
        title: "Qwetu Suburbia Student Residence",
        category: "Hostel",
        location: "Ruiru / Near KU Main Gate",
        price: 12500,
        period: "per month",
        amenities: ["High-speed Wi-Fi", "Biometric Gate Access", "Study Lounge", "24/7 Security"],
        imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "The Obsidian Luxury Studio",
        category: "BnB",
        location: "Kilimani, Nairobi",
        price: 4500,
        period: "per night",
        amenities: ["Rooftop Pool", "Smart TV + Netflix", "Borehole Water", "Gym Access"],
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Emerald Heights 2-Bedroom Executive",
        category: "House",
        location: "Westlands, Nairobi",
        price: 65000,
        period: "per month",
        amenities: ["Master En-suite", "Balcony View", "CCTV Monitoring", "Dedicated Parking"],
        imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
      }
    ];
    const seeded = await Property.insertMany(sampleProperties);
    res.status(201).json({ message: "Database seeded successfully!", properties: seeded });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Add Single Property (For Agents / Admins)
app.post('/api/properties', upload.single('photo'), async (req, res) => {
  try {
    const { title, category, location, price, period, amenities } = req.body;
    const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : (req.body.imageUrl || '');

    const newProperty = new Property({
      title,
      category,
      location,
      price: Number(price || 0),
      period: period || 'per month',
      amenities: typeof amenities === 'string'
        ? amenities.split(',').map((item) => item.trim()).filter(Boolean)
        : Array.isArray(amenities) ? amenities : [],
      imageUrl,
      status: 'AVAILABLE'
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});