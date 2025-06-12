const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require("./config/db"); // no need for destructuring


dotenv.config();

const PORT = process.env.PORT || 5000;


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to start server:", err.message);
});
