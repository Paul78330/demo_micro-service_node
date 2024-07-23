const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const Comment = require('./models/Comment.js'); // Assurez-vous d'avoir un modèle Comment
const axios = require('axios');
const fs = require('fs');

const app = express();

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/commentService', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bodyParser.json());

// Configure Express to use EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Afficher la page d'accueil
app.get('/', (req, res) => {
  // const base = fs.readFileSync('footer.ejs', 'utf8');
  // res.render('comments', {footer});
});

app.use(express.static(path.join(__dirname, 'public')));

// Route pour créer un commentaire
app.post('/comments', (req, res) => {
  const comment = new Comment({
    postId: req.body.postId,
    userId: req.body.userId,
    text: req.body.text,
  });

  comment.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(error => res.status(400).json({ error }));
});

// Route pour afficher tous les commentaires
app.get('/show-comments', (req, res) => {
  Comment.find()
    .then(comments => res.render('show-comments', { comments }))
    .catch(error => res.status(400).json({ error }));
});

// Route pour obtenir tous les commentaires pour un post
app.get('/comments/:postId', (req, res) => {
  Comment.find({ postId: req.params.postId })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
});




// // Pour récupérer base.ejs
// axios.get('http://localhost:3000/template/base')
//   .then(response => {
//     // Le contenu de base.ejs est dans response.data
//     fs.writeFile('base.ejs', response.data, err => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log('base.ejs a été enregistré avec succès.');
//       }
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   });

// // Pour récupérer footer.ejs
// axios.get('http://localhost:3000/template/footer')
//   .then(response => {
//     // Le contenu de footer.ejs est dans response.data
//     fs.writeFile('footer.ejs', response.data, err => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log('footer.ejs a été enregistré avec succès.');
//       }
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   });


app.listen(3005, () => console.log('Le serveur a démarré sur le port 3000'));