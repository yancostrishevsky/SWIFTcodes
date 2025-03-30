const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const swiftRoutes = require('./routes/swiftRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('SWIFT Codes API');
});

app.use('/v1/swift-codes', swiftRoutes);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 8080;

  sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}
