require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For password hashing
const crypto = require('crypto'); // For PayHere hash generation
const User = require('./models/User'); // Import User model
const Product = require('./models/Product'); // Import Product model
const BrandReview = require('./models/BrandReview'); // Import BrandReview model

// Initialize Express app
const app = express();

// Middlewares
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    // Start the server only after a successful DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Connection error', error.message);
  });

// A simple test route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Search products by name or description
app.get('/api/products/search', async (req, res) => {
  try {
    const q = req.query.q?.trim();
    if (!q || q.length < 2) {
      return res.status(400).json({ message: 'Search query parameter "q" is required' });
    }
    
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } }, 
        { description: { $regex: q, $options: 'i' } },
        { subtitle: { $regex: q, $options: 'i' } }
      ],
    }).limit(10); // Limit results for better performance
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error: error.message });
  }
});

// Get single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[DEBUG] Single Product Request for ID: ${id}`);

    let product;

    // 1. Try finding by MongoDB _id first
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    }

    // 2. Fallback: Try finding by the custom 'id' field (numeric or string)
    if (!product) {
      const numericId = parseInt(id, 10);
      product = await Product.findOne({
        $or: [
          { id: isNaN(numericId) ? null : numericId },
          { id: id }
        ]
      });
    }

    if (!product) {
      console.log(`[WARN] Product with ID ${id} not found in database.`);
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// Register Route
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: { firstName: user.firstName, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot Password Route
app.post('/forgot-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Forgot Password Route - Simple reset logic
app.post('/forgot-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Post Brand Review
app.post('/api/brand-reviews', async (req, res) => {
  const { reviewText, userName } = req.body;
  if (!reviewText) return res.status(400).json({ message: 'Review text is required' });

  try {
    const newReview = new BrandReview({
      userName: userName || 'Anonymous',
      reviewText
    });
    await newReview.save();
    res.status(201).json({ message: 'Review posted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error posting review', error: error.message });
  }
});

// Generate PayHere Hash
app.post('/api/payment/generate-hash', (req, res) => {
  console.log("Backend: Received hash request for order:", req.body.orderId);
  try {
    const { orderId, amount, currency } = req.body;
    
    const merchantId = process.env.PAYHERE_MERCHANT_ID;
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;

    if (!merchantId || !merchantSecret) {
      console.error("PAYHERE ERROR: Merchant ID or Secret missing in .env file!");
      return res.status(500).json({ message: "Payment configuration missing on server" });
    }

    // PayHere Hash Security Formula: 
    // Upper(MD5(MerchantID + OrderID + Amount + Currency + Upper(MD5(MerchantSecret))))
    
    const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
    
    // Safe formatting to 2 decimal places without locale-specific characters
    const amountFormatted = parseFloat(amount).toFixed(2);
    
    const hash = crypto.createHash('md5')
      .update(merchantId + orderId + amountFormatted + currency + hashedSecret)
      .digest('hex')
      .toUpperCase();

    res.json({ hash, merchantId });
  } catch (error) {
    res.status(500).json({ message: 'Error generating hash', error: error.message });
  }
});
