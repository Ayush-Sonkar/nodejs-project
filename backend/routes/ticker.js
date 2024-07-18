const express = require('express');
const axios = require('axios');
const Ticker = require('../models/Ticker');
const router = express.Router();

// Fetch and store data
router.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = Object.values(response.data).slice(0, 10);

    await Ticker.deleteMany({});

    const tickerData = tickers.map(ticker => ({
      name: ticker.name,
      last: ticker.last,
      buy: ticker.buy,
      sell: ticker.sell,
      volume: ticker.volume,
      base_unit: ticker.base_unit,
    }));

    await Ticker.insertMany(tickerData);

    res.json({ msg: 'Data fetched and stored successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get stored data
router.get('/', async (req, res) => {
  try {
    const tickers = await Ticker.find();
    res.json(tickers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
