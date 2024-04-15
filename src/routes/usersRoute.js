const express = require('express')
const router = express.Router()
const db = require('../db')


// Get all users
router.get('/', (req, res) => {
    var usersJson = []

    db.each('SELECT * FROM users', function(err, row) {
      usersJson.push(row)
      
    }, function() {
      res.send(usersJson)
    })
  
    res.set('Content-Type', 'text/html')
    res.set('Server', 'My Ecommerce Server')
    console.log('userJson', usersJson);
})

// Create new user
router.post('/', (req, res) => {
    const data = req.body;
    console.log('data', data);
  
    const smt = db.prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)');
    smt.run(data.username, data.email, data.password, data.role, function(err) {
      if (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      smt.finalize();
      res.set('Content-Type', 'text/html');
      res.set('Server', 'My Ecommerce Server');
      res.status(201).send('User created successfully');
    });

})

// Get a user by id
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM users WHERE id = ?', req.params.id, function(err, row) {
      if (err) {
          console.error('Erreur lors de la récupération de l\'utilisateur :', err);
          res.status(500).send('Erreur interne du serveur');
          return;
      }
     
      console.log('utilisateur :', row);
      res.send(row); // Envoyer les données de l'utilisateur en réponse
  });
});

// Modify a user
router.put('/:id', (req, res) => {
  const { username, email, password, role } = req.body;
  const userId = req.params.id;

  db.run('UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?', [username, email, password, role, userId], function(err) {
      if (err) {
          console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
          res.status(500).send('Erreur interne du serveur');
          return;
      }

      console.log('Utilisateur mis à jour avec succès', req.body);
      res.send(req.body);
      // res.send('Utilisateur mis à jour avec succès');
  });
});

//  Delete a user
router.delete('/:id', (req, res) => {
  const userId = req.params.id;

  db.run('DELETE FROM users WHERE id = ?', userId, function(err) {
      if (err) {
          console.error('Erreur lors de la suppression de l\'utilisateur :', err);
          res.status(500).send('Erreur interne du serveur');
          return;
      }

      console.log('Utilisateur supprimé avec succès');
      res.send('Utilisateur supprimé avec succès');
  });
});



module.exports = router