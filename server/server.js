// Import dependencies
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const bodyParser = require("body-parser");
const AuthRouter = require("./routes/auth/auth-routes");
const connectToDb = require("./config/dbConfig");
const AdminProductsRoutes = require("./routes/admin/products-routes");
const AdminOrdersRouter = require("./routes/admin/order-routes");

const ShopProductsRouter = require("./routes/shop/products-routes");
const ShopCartRouter = require("./routes/shop/cart-routes");
const ShopAddressRouter = require("./routes/shop/address-routes");
const ShopOrderRouter = require("./routes/shop/order-routes");
const ShopSearchRouter = require("./routes/shop/search-routes");
const ShopReviewRouter = require("./routes/shop/review-routes");

const CommonFeatureRouter = require("./routes/common/feature-routes");

const app = express();

// define port
const port = process.env.PORT || 5000;

// databae connect
connectToDb();

// url encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure cors, cookie-parser
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

// import routes
app.use("/api/auth", AuthRouter);
app.use("/api/admin/products", AdminProductsRoutes);
app.use("/api/admin/order", AdminOrdersRouter);

app.use("/api/shop/products", ShopProductsRouter);
app.use("/api/shop/cart", ShopCartRouter);
app.use("/api/shop/address", ShopAddressRouter);
app.use("/api/shop/order", ShopOrderRouter);
app.use("/api/shop/search", ShopSearchRouter);
app.use("/api/shop/review", ShopReviewRouter);

app.use("/api/common/feature", CommonFeatureRouter);

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
