const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");



router.get('/', async (req,res)=>{
    const connectionState = mongoose.connection.readyState; // 1 means connected

    try {
        if (connectionState !== 1) {
            return res.status(500).json({
                status: "error", db: "disconnected", message: "Mongoose not connected",
            });
        }

        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map((col) => col.name);
        res.json({status: "ok", db: "connected", collections: collectionNames, timestamp: new Date(), });

    } 
    catch (err) {
        console.error('DB check failed:', err.message);
        res.status(500).json({  status: 'error', db: 'disconnected', message: err.message });
    }

});


module.exports = router;
