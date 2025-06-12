const express = require('express');
const router = express.Router();
const { getDB } = require('../config/db');


router.get('/', async (req,res)=>{
    try {
        const db = getDB();
        const collections = await db.listCollections().toArray();

        res.json({
        status: 'ok',db: 'connected', collections: collections.map(c => c.name),timestamp: new Date()
        });

    } catch (err) {
        console.error('DB check failed:', err.message);
        res.status(500).json({  status: 'error', db: 'disconnected', message: err.message });
    }

});


module.exports = router;