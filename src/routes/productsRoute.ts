import { ProductController } from "./../controllers/productController";
import express, { Router } from "express";

export class ProductRoutes {
  public router: Router;
  private productController: ProductController;
  constructor() {
    this.router = express.Router();
    this.productController = new ProductController();
    this.configRoutes();
  }

  private configRoutes() {
    this.router.get(
      "/",
      this.productController.getAll.bind(this.productController)
    );
    this.router.post(
      "/",
      this.productController.create.bind(this.productController)
    );
    this.router.get(
      "/:id",
      this.productController.getById.bind(this.productController)
    );
    this.router.put(
      "/:id",
      this.productController.update.bind(this.productController)
    );
    this.router.delete(
      "/:id",
      this.productController.delete.bind(this.productController)
    );
  }
}
