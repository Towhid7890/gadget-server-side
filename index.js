const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

require("dotenv").config();
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.icyspqk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const laptopCollection = client.db("categories").collection("category");
    const bookingCollection = client.db("categories").collection("bookings");
    const userCollection = client.db("categories").collection("users");

    app.get("/category/:id", async (req, res) => {
      const id = req.params.id;
      const query = { category_Id: id };
      const result = await laptopCollection.find(query).toArray();
      res.send(result);
    });
    // post method for bookings
    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });
    // post for users method
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Laptop server running");
});

app.listen(port, () => {
  console.log(`Laptop Server listening on port ${port}`);
});
