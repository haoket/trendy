import express from "express";
import bodyParser from "body-parser";
import config from "./src/config/config.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import orderItemRoutes from "./src/routes/orderItemsRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import cartRoutes from "./src/routes/cartRoute.js";
import blogRoute from "./src/routes/blogRoute.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
//
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// my-routes
authRoutes(app);
categoryRoutes(app);
orderItemRoutes(app);
orderRoutes(app);
productRoutes(app);
userRoutes(app);
cartRoutes(app);
blogRoute(app);
app.get("/", (req, res) => {
  res.send("Hello😁 Welcome ecommerce API!");
});

// Đặt tên thư mục chứa hình ảnh
const imageDirectory = path.join(__dirname, 'src/image');

// Sử dụng middleware để phục vụ hình ảnh từ thư mục "images"
app.use('/image', express.static(imageDirectory));


app.listen(config.port, () => {
  console.log(`Server is running on ${config.url}`);

});
