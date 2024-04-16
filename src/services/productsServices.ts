import { Product } from "../models/product";
import { Database } from "../database/database";

export class ProductService {
  private db: Database; // initialize the database
  constructor() {
    this.db = new Database(); // create an instance of the database
  }

  // GET ALL PRODUCTS
  async getAll(): Promise<Product[]> {
    const products: Product[] = await this.db.query("SELECT * FROM products");
    return products;
  }

  // GET Product BY ID
  async getById(id: string): Promise<Product> {
    const products: Product[] = await this.db.query(
      "SELECT * FROM products where id=?",
      [id]
    );
    //const Product2:Product= await  this.db.query(`SELECT * FROM products where id=${id}`);
    //const Product3:Product= await  this.db.query("SELECT * FROM products where id="+id);
    if (products.length > 0) {
      return products[0];
    }
    throw new Error(`Aucun produit trouvé avec l'ID ${id}`); // Rejeter la promesse avec un message d'erreur approprié;
  }
  
  // CREATE Product
  async create(newProduct: Product): Promise<Product> {
    const result = await this.db.query(
      "INSERT INTO products(name,description,price) VALUES (?,?,?)",
      [newProduct.name, newProduct.description, newProduct.price]
    );

    //newProduct.id = result.lastId;
    return newProduct;
  }

  // DELETE Product
  async delete(id: string): Promise<any> {
    const result: any = await this.db.query("DELETE FROM products where id=?", [
      id,
    ]);
    return result;
  }

  // UPDATE Product
  async update(product: Product): Promise<Product> {
    const result = await this.db.query(
      "UPDATE products SET  name=?, description=?, price=?  where id = ?",
      [product.name, product.description, product.price, product.id]
    );
    return result;
  }
}
