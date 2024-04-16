import express from "express";
import bodyParser from "body-parser";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import { UserRoutes } from "./routes/usersRoute";
import { ProductRoutes } from "./routes/productsRoute";

const userRoutes = new UserRoutes();
const productRoutes = new ProductRoutes();

app.use("/users", userRoutes.router);
app.use("/products", productRoutes.router);

app.listen(process.env.PORT || 4000);
console.log(`Server listening on port ${process.env.PORT || 3000} 😎`);
