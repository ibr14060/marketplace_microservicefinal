/*require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { mongoClient } = require('./db');
const{connectToDb,getDb}=require('./db')

const app = express();

/*app.get('/', async (req,res) => {
  const db = await mongoClient();
  if (!db) res.status(500).send('Systems Unavailable');

  const { data } = await axios.get('https://goweather.herokuapp.com/weather/california');
  await db.collection('weather').insertOne(data);

  return res.send(data);
});

let db
connectToDb((err)=>{
    if(!err){
        app.listen(3000,()=>{
            console.log('app on host 3000')
        })
        db=getDb
    }
        })
  



app.get('/products',(req, res) => {
    let products=[]
    db.collection('products').find()
    .sort({name:1})
    .forEach(product =>products.push(product))
    .then(()=>{
        res.status(200).json(products)
    })
    .catch(()=>{
        res.status(500).json(({error:'error'}))
})
res.json({mssg:"welcome to api"})
})*/

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { mongoClient } = require('./db');
const{objectId}=require('mongodb')
const app = express();

app.get('/', async (req,res) => {
  const db = await mongoClient();
  if (!db) res.status(500).send('Systems Unavailable');

  //const { data } = await axios.get('https://goweather.herokuapp.com/weather/california');
  let products=[]
  await db.collection('products').find().forEach(product =>products.push(product))
  .then(()=>{
      res.status(200).json(products)
  })
  .catch(()=>{
      res.status(500).json(({error:'error'}))
});

  return res.send();
});

app.get('//:id', async (req,res) => {
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
  
    
    let products=[]
    await db.collection('products').findone({_id:objectId(req.params.id)})
    .then(()=>{
        res.status(200).json(products)
    })
    .catch(()=>{
        res.status(500).json(({error:'error'}))
  });
  
    return res.send();
  });
  
app.listen(3000);
/*/
app.get('/products',(req, res) => {
    let products=[]
    db.collection('products').find()
    .sort({name:1})
    .forEach(product =>products.push(product))
    .then(()=>{
        res.status(200).json(products)
    })
    .catch(()=>{
        res.status(500).json(({error:'error'}))
})
res.json({mssg:"welcome to api"})
})*/