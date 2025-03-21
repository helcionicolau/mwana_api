// app.js - Arquivo principal
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const path = require('path');


const { sequelize } = require('./src/models');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para parsing e CORS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
  credentials: true,
}));

// Middleware de log e controle de CORS
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    console.log('Options request received');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).send({});
  }
  next();
});

// Servir arquivos estáticos (para fotos de perfil)
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

// Rotas da API
app.use('/api', routes);

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on https://securegestapi-production.up.railway.app:${PORT}`);
      console.log(`Swagger docs available at https://securegestapi-production.up.railway.app:${PORT}/api-docs`);
    });
  })
  .catch((err) => console.error('Database connection error:', err));
