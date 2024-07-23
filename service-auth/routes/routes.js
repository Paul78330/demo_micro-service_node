const express = require('express');

// Créez un nouveau routeur Express
const router = express.Router();

// Configurez le routeur pour utiliser EJS
router.get('/', (req, res) => {
  console.log('home');
  const user = 'utilisateur fictif'
  res.render('home',{user});
});

//Afficher la page d'inscription
router.get('/register', (req, res) => {
  res.render('register');
});

//Afficher la page de connexion
router.get('/login', (req, res) => {
  res.render('login');
});

// Afficher la page logout
router.get('/logout', (req, res) => {
  req.session.user = null; // Réinitialiser req.session.user
  res.render('home');
});


// Exportez le routeur
module.exports = router;