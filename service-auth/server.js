const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.locals.user = req.app.get('user');
  next();
});

// Configure Express to use EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Middleware d'authentification
function authenticateToken(req, res, next) {
  const token = req.cookies.authToken || req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'A token is required for authentication' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Routes publiques
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
      res.cookie('authToken', token, { httpOnly: true });
      res.redirect('http://localhost:3000/albums');
    } else {
      res.send('Not Allowed');
    }
  } catch {
    res.status(500).send();
  }
});

app.post('/register', async (req, res) => {
  if (!req.body.password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      number: req.body.number
    });
    await user.save();
    res.redirect('http://localhost:3000/login');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes protégées
app.use(authenticateToken);
app.use('/', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

mongoose.connect('mongodb://localhost:27017/phototheque-auth', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3002, (err) => {
      if (err) {
        console.error('Failed to start server: ', err);
        process.exit(1);
      }
      console.log('Application is running on port 3002');
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });