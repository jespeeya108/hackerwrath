const config = require('./src/config/env'); // must load first (reads .env)
const connectDB = require('./src/config/db');
const app = require('./src/app');

const start = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port} (${config.nodeEnv})`);
  });
};

start();