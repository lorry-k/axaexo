import PocketBase from "pocketbase/cjs";
import express from "express";
import fetch from "cross-fetch/dist/node-polyfill.js";
import bodyParser from "body-parser";
import { API_URL, API_EMAIL, API_PASSWORD } from "./constants.js";
import cors from "cors";

const app = express();
const pb = new PocketBase(API_URL);
const authData = pb.admins.authWithPassword(API_EMAIL, API_PASSWORD);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); // to support URL-encoded bodies;

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

// Définir des en-têtes pour toutes les réponses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});


app.listen(3000, () => {
  console.log(`API is running on port 3000`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/items", async (req, res) => {
  try {
    const records = await pb.collection("items").getFullList({
      sort: "-created",
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/logs", async (req, res) => {
  try {
    const records = await pb.collection("logs").getFullList({
      sort: "-created",
      expand: "item"
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/logs", async (req, res) => {
  const data = {
    nameClient: req.body.nameClient,
    firstnameClient: req.body.firstnameClient,
    item: req.body.item,
    quantity: req.body.quantity,
    totalPrice: req.body.totalPrice,
  };

  try {
    const record = await pb.collection("logs").create(data);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
