const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./models/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import Routers
const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');
const servicesRouter = require('./routes/services');

// Handles Endpoints
app.use('/roles', rolesRouter);
app.use('/services', servicesRouter);
app.use('/users', usersRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use('*', (req, res) => res.status(404).json('NO content at this path'));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
