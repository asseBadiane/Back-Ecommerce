const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
    var productsJson = []

    db.each('SELECT * FROM products', function(err, row) {
      productsJson.push(row)
      
    }, function() {
      res.send(productsJson)
    })
  
    res.set('Content-Type', 'text/html')
    res.set('Server', 'My Ecommerce Server')
    console.log('The products Json', productsJson);
})

// Get a product by id
router.get('/:id', (req, res) => {
    db.get('SELECT * FROM products WHERE id = ?', req.params.id, function(err, row) {
        if (err) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', err);
            res.status(500).send('Erreur interne du serveur');
            return;
        }
       
        console.log('produit :', row);
        res.send(row); // Envoyer les données de l'utilisateur en réponse
    });
  });

// Create new product
router.post('/', (req, res) => {
    const data = req.body;
    console.log('data', data);
  
    const smt = db.prepare('INSERT INTO products (name, description, price) VALUES (?, ?, ?)');
    smt.run(data.name, data.description, data.price, function(err) {
      if (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      smt.finalize();
      res.set('Content-Type', 'text/html');
      res.set('Server', 'My Ecommerce Server');
      res.status(201).send(data);
    });

})

// Modify a product
router.put('/:id', (req, res) => {
    const { name, description, price } = req.body;
    const productId = req.params.id;
  
    db.run('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, productId], function(err) {
        if (err) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
            res.status(500).send('Erreur interne du serveur');
            return;
        }
  
        console.log('Produit mis à jour avec succès', req.body);
        res.send(req.body);
        // res.send('Utilisateur mis à jour avec succès');
    });
  });
  
  //  Delete a product
  router.delete('/:id', (req, res) => {
    const productId = req.params.id;
    const { name, description, price } = req.body;
 
    db.run('DELETE FROM products WHERE id = ?', productId, function(err) {
        if (err) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', err);
            res.status(500).send('Erreur interne du serveur');
            return;
        }
  
        console.log('Produit supprimé avec succès');
        res.send(`Produit '${name}' supprimé avec succès  🙁`);
    });
  });
  

module.exports = router