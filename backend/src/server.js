require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { JsonRpcProvider } = require('ethers');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const provider = new JsonRpcProvider(process.env.ALCHEMY_API_URL);

let orders = [];

app.get('/', async (req, res) => {
  try {
    const blockNumber = await provider.getBlockNumber();
    res.send(`Current block number on Base: ${blockNumber}`);
  } catch (error) {
    console.error("Error fetching block number:", error);
    res.status(500).send(`Error fetching block number: ${error.message}`);
  }
});

app.post('/place-order', (req, res) => {
  const { order, signature, account } = req.body;
  orders.push({ order, signature, account });
  res.send('Order received.');
});

async function monitorOrders() {
  while (true) {
    try {
      for (const { order, signature, account } of orders) {
        // Add logic to check if the order conditions are met
        // For example, check the current price from Uniswap
        // If conditions are met, execute the transaction
        console.log(`Monitoring order from ${account}: ${JSON.stringify(order)}`);
      }
      await new Promise(resolve => setTimeout(resolve, 60000)); // Check every minute
    } catch (error) {
      console.error("Error monitoring orders:", error);
    }
  }
}

monitorOrders();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
