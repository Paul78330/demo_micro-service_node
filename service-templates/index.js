const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3003;

// Définissez le moteur de rendu ici
app.set('view engine', 'ejs');

// Corrigez le chemin ici
app.set('views', path.join(__dirname, 'views', 'common'));

// Importez et utilisez vos routes ici
const commonRoutes = require('./routes/commonRoutes');

// const user = "John Doe";

// app.use((req, res, next) => {
//   req.user = "John Doe";
//   next();
// });

// Utilisez commonRoutes une seule fois
app.use(commonRoutes);

app.get('/', (req, res) => {
  res.render('base',{user});
});

app.listen(port, () => {
  console.log(`Template service listening at http://localhost:${port}`);
});