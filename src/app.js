require('./config/db.config')
require('dotenv').config();
const express = require('express');
const product = require('./routes/product.route')
const masters = require('./routes/category.route')
const auth = require('./routes/auth.route')
const order = require('./routes/order.route')
const warehouse = require('./routes/warehouse.route')
const plaid = require('./routes/plaid.route')

const xmlparser = require('express-xml-bodyparser');
const cors = require('cors');
const path = require('path');



const app = express();
const port = process.env.PORT 
const allow_orgin = process.env.ALLOW_CROSS_ORIGIN 


app.use(cors({
    origin: allow_orgin,
    credentials: true
}));
app.use(xmlparser());
app.use('/api/v1/uploads', express.static(path.join(__dirname, '../uploads')));
console.log('Serving static files from: ', path.join(__dirname, '../'));

app.use(express.json({ limit: "100mb" }));
//for product
app.use('/api/v1', product)
//for  plaid
app.use('/api/v1', plaid)


//for category
app.use('/api/v1', masters)

//register
app.use('/api/v1', auth)

//order
app.use('/api/v1', order)

//warehouse
app.use('/api/v1', warehouse)


app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);  
})


const axios = require('axios');

// const convertCurrency = async (base, target, amount) => {
//   const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${base}&to=${target}`;
//   try {
//     const response = await axios.get(url);
//     console.log('response',response);
    
//     const convertedAmount = response.data.rates[target];
//     console.log(`${amount} ${base} is equal to ${convertedAmount} ${target}`);
//   } catch (error) {
//     console.error('Error fetching currency data:', error);
//   }
// };



// console.log('Converted currency',convertCurrency('USD', 'INR', 100));





