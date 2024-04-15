const productService = require("../services/productsServices");

// GET ALL PRODUCTS
exports.getAll = (req, res) => {
  productService.getAll(function(err, list_products) {
      if (err) {
        // Gérer l'erreur
        console.error("Erreur lors de la récupération des produits :", err);
        res.status(500).json({ message: "Erreur lors de la récupération des produits" });
        return;
      }
      // Renvoyer les données récupérées
      res.json(list_products);
    });
  };
  

// GET PRODUCT BY ID
exports.getById = (req, res) => {
    const id = req.params.id;
    productService.getById(id, function(err, data) {
      if (err) {
        // Gérer l'erreur
        res.status(500).json({ error: "Erreur interne du serveur" });
        return;
      }
      // Renvoyer les produits
      res.json(data);
    });
  };
  

// CREATE USER
exports.create = (req, res) => {
    const { name, description, price } = req.body;
    if (
      name === undefined ||
      price === undefined
    ) {
      res.status(400).json({ message: "Le corps de la requête ne correspond pas au contrat" });
    } else {
        const product = { name, description, price };
        const data = productService.create(product);
        res.status(201).json(data);
        
    }
  };

// UPDATE PRODUCT
exports.update = (req, res) => {
  const id = req.params.id;
  const product = req.body;
  const data = productService.update(id, product);
  res.status(200).json(data);
};

exports.delete = (req, res) => {
  const id = req.params.id;
  productService.delete(id);
  res.status(200).json({ message: `Produit supprimé avec succès` });
};



  