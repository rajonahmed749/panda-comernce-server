const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const port = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json())
app.use(cors())



const uri = `mongodb+srv://pandaCommerce:${process.env.DB_PASS}@cluster0.slusw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db("panBatabase").collection("shoes");

    app.post('/addOrder', (req, res) => {
        const newOrder = req.body;
        collection.insertOne(newOrder)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    });
    console.log(err)
});



app.get('/', (req, res) => {
    res.send("Panda Commerce server here")
    console.log("database connected")
})


app.listen(process.env.PORT || port)