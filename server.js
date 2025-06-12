const dotenv = require('dotenv');
const app = require('./app');
const { connectDB } = require('./config/db');

// Load environment variables from .env file
dotenv.config();


const PORT = process.env.PORT || 5000;


// Start the server
connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
