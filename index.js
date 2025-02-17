const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authRouter = require('./controllers/authController');
const userRouter = require('./controllers/userController');
const adminRouter = require('./controllers/adminController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views/principal')));

// Rutas para archivos estáticos
app.use('/css', express.static(path.join(__dirname, 'views/principal/css'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.use('/js', express.static(path.join(__dirname, 'views/principal/js'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Rutas para archivos estáticos y vistas
app.use('/js', express.static(path.join(__dirname, 'views/js')));
app.use('/css', express.static(path.join(__dirname, 'views/css')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/login', express.static(path.join(__dirname, 'views/login')));
app.use('/registro', express.static(path.join(__dirname, 'views/registro')));
app.use('/admin', express.static(path.join(__dirname, 'views/admin')));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Rutas de la API
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/principal/index.html'));
});

app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/principal/index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/admin/index.html'));
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


