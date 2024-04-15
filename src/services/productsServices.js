const db = require("../db");

// GET ALL products
exports.getAll = (callback) => {
  let productsJson = [];
  db.each(
    "SELECT * FROM products",
    function (err, row) {
      if (err) {
        console.error("Erreur lors de la récupération des produits :", err);
        callback(err, null);
        return;
      }
      productsJson.push(row);
      console.log(row);
    },
    function () {
      callback(null, productsJson);
    }
  );
};

// GET product by id
exports.getById = (id, callback) => {
  db.get("SELECT * FROM products WHERE id = ?", id, function (err, row) {
    if (err) {
      console.error("Erreur lors de la récupération du produit :", err);
      callback(err, null); // Renvoyer l'erreur au callback
      return;
    }

    console.log("produit :", row);
    callback(null, row); // Renvoyer les données du produit au callback
  });
};

// Create a product
exports.create = (product) => {
  db.prepare(
    "INSERT INTO products (name, description, price) VALUES (?, ?, ?, ?)"
  ).run(product.name, product.description, product.price);
  console.log(product);
  return product;
};

// Update a product
exports.update = (productId, product) => {
  db.run('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [product.name, product.description, product.price, productId], function(err) {
      if (err) {
          console.error('Erreur lors de la mise à jour du produit :', err);
          res.status(500).send('Erreur interne du serveur');
          return;
      }
  });
  console.log('Produit mis à jour avec succès', product);
  return product;
};

// Dlete a product
exports.delete = (productId) => {
  db.run("DELETE FROM products WHERE id = ?", productId, function (err) {
    if (err) {
      console.error("Erreur lors de la suppression du produit :", err);
      res.status(500).send("Erreur interne du serveur");
      return;
    }
    console.log("Produit supprimé avec succès");
  });
};

