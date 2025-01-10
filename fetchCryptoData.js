const axios = require('axios');
const Crypto = require('../models/cryptoModel');

const fetchCryptoData = async () => {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
        );
        const data = response.data;

        for (const coin of coins) {
            await Crypto.create({
                coin: coin,
                price: data[coin].usd,
                marketCap: data[coin].usd_market_cap,
                change24h: data[coin].usd_24h_change,
            });
        }
        console.log('Data fetched and stored successfully');
    } catch (err) {
        console.error('Error fetching data:', err.message);
    }
};

module.exports = fetchCryptoData;
