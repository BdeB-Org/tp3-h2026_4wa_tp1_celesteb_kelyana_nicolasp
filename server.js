const express = require('express');
const path = require('path');
const app = express();

// Initialise la BD
require('./config/database');

app.use(express.json());
app.use(express.static('public'));

// const projetRoutes = require("./routes/projetRoutes");
const eleveRoutes = require("./routes/etudiantsRoutes");
// const typesprojetRoutes = require("./routes/typesprojetRoutes");
// const imagesRoutes = require("./routes/imagesRoutes");
const authRoutes = require('./routes/authRoutes');

app.use('/api', eleveRoutes);
app.use('/api/auth', authRoutes);

// Redirection par défaut
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
