require("./db/config");
const express = require("express");
const cors = require("cors");
const User = require("./db/User");
const Product = require("./db/Product");
const { accessSync } = require("fs");
const Order = require("./db/Order");
const app = express();
const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ message: "Something went wrong" });
    }
    resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({ message: "Something went wrong" });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send("No user found!");
    }
  } else {
    resp.send("Please fill both the fields");
  }
});

app.post("/add-product", verfyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No products found" });
  }
});

app.delete("/product/:id", verfyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", verfyToken, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No product found" });
  }
});

app.put("/product/:id", verfyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/search/:key", async (req, resp) => {
  try {
    let result = await Product.find({
      $or: [
        { name: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
      ],
    });
    resp.send(result);
  } catch (error) {
    console.error(error);
    resp
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const order = await new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Error creating order", error });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching orders", error });
  }
});

app.delete("/order/:id", verfyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }

    res
      .status(200)
      .send({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting order", error });
  }
});

function verfyToken(req, resp, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ")[1];
    const token = bearer;
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with header" });
  }
}

app.listen(5000);
