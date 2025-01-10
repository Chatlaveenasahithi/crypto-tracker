const Crypto = require('../models/cryptoModel');

exports.getPriceDeviation = async (req, res) => {
    const { coin } = req.query;

    if (!coin) return res.status(400).json({ error: 'Coin query parameter is required' });

    try {
        const prices = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100).select('price -_id');
        if (prices.length === 0) return res.status(404).json({ error: 'Not enough data for the specified coin' });

        const priceArray = prices.map((p) => p.price);
        const mean = priceArray.reduce((acc, price) => acc + price, 0) / priceArray.length;
        const variance = priceArray.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / priceArray.length;
        const stdDev = Math.sqrt(variance);

        res.json({ deviation: parseFloat(stdDev.toFixed(2)) });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
