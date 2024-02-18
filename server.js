const express = require("express");
const { port, mongo_connection_string } = require("./constants/constants");

const mongoose = require("mongoose");

const bodyParse = require("body-parser");

const { productModel } = require("./models/productModel");

const app = express();

app.use(express.json());
app.use(bodyParse.json());

// route

app.get("/", (req, res) => {
  res.send({
    message: "home route",
  });
});

//create
app.post("/product", async (req, res) => {
  try {
    // const data = req.body
    // console.log("response :",data)
    const product = await productModel.create(req.body);
    res.status(200).json({
      message: "successfully Inserted",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// get

app.get("/product", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// get by id

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await productModel.findById(id);
    if (product) {
      res.status(200).json({
        product,
      });
    } else {
      res.status(404).json({
        message: "Product Not Found !",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// update

app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const UpdateProduct = await productModel.findByIdAndUpdate(id, req.body);
    if (!UpdateProduct) {
      res.status(404).json({
        message: "product not found !",
      });
    }
    res.status(200).json({
      product: UpdateProduct,
    });
  } catch (error) {
    console.log(error);
  }
});

// delete

app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteproduct = await productModel.findByIdAndDelete(id);
    if (!deleteproduct) {
      res.status(404).json({
        message: "Product not found !",
      });
    }
    else{
        res.status(200).json({
            message: "Product Deleted !",
            deleteProduct:deleteproduct
          });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message:"Internal Server error"
    })
  }
});

const Run_port = port;

mongoose
  .connect(mongo_connection_string + "nodejs")
  .then(() => {
    console.log("connected to mongodb");
    app.listen(Run_port, () => {
      console.log(`server is running on the port ${Run_port}`);
    });
  })
  .catch((error) => {
    console.log("Error :", error);
  });
