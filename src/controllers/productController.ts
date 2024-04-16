import { Product } from "../models/product";
import { User } from "../models/user";
import { ProductService } from "../services/productsServices";
import { Request, Response } from "express";

export class ProductController {
  private productService: ProductService; // initialize the Service
  constructor() {
    this.productService = new ProductService(); // create an instance of the Service
  }

  // GET ALL PRODUCTS
  async getAll(req: Request, res: Response) {
    try {
      const list_products = await this.productService.getAll();
      res.json(list_products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // GET PRODUCT BY ID
  async getById(req: Request, res: Response) {
    try {
      const product = await this.productService.getById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.sendStatus(404);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // CREATE PRODUCT
  async create(req: Request, res: Response) {
    const { name, description, price } = req.body;
    if (
      name === undefined ||
      description === undefined ||
      price === undefined
    ) {
      res.status(400).json({ message: "body not match contract " });
    } else {
      try {
        const newProduct: Product = { name, description, price };
        const data = await this.productService.create(newProduct);
        res.status(201).json(data);
        console.log(data);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
    }
  }

  // UPDATE USER
  async update(req: Request, res: Response) {
    try {
      let product: Product = req.body;
      product.id = req.params.id as string;
      const data = await this.productService.update(product);
      res.status(200).json({ message: "product updated successfully 😃" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // DELETE USER
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await this.productService.delete(id);
      res.status(200).json({ message: "product deleted successfully 😥" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
