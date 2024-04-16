// const productService = require("../services/productsServices");
import { Request, Response } from "express";
import { productService } from "../services/productsServices";

export const productController = {
  

// GET ALL PRODUCTS
  getAll (req: Request, res: Response) {
  productService.getAll(function(err: any, list_products:[]) {
      if (err) {
        // Gérer l'erreur
        console.error("Erreur lors de la récupération des produits :", err);
        res.status(500).json({ message: "Erreur lors de la récupération des produits" });
        return;
      }
      // Renvoyer les données récupérées
      res.json(list_products);
    });
  },
  

// GET PRODUCT BY ID
getById(req: Request, res: Response) {
  const id: any = req.params.id;
  productService.getById(id, function(err: any, data: any) {
    if (err) {
      // Gérer l'erreur de manière explicite
      console.error("Erreur lors de la récupération du produit par ID:", err);
      res.status(500).json({ error: "Erreur interne du serveur" });
      return;
    }
    if (!data) {
      // Si aucun produit n'est trouvé avec cet ID
      res.status(404).json({ error: "Produit non trouvé" });
      return;
    }
    // Renvoyer les produits
    res.json(data);
  });
},


// CREATE USER
  create(req: Request, res: Response) {
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
  },

// UPDATE PRODUCT
  update (req: Request, res: Response) {
  const id: any = req.params.id;
  const product = req.body;
  const data = productService.update(id, product);
  res.status(200).json(data);
},

  delete(req: Request, res: Response) {
  const id: any = req.params.id;
  productService.delete(id);
  res.status(200).json({ message: `Produit supprimé avec succès` });
}


}
  