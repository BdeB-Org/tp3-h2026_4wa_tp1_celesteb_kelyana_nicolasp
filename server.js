const express = require("express");

const app = express();

const projetRoutes = require("./routes/projetRoutes");
const eleveRoutes = require("./routes/etudiantsRoutes");
const typesprojetRoutes = require("./routes/typesprojetRoutes");
const imagesRoutes = require("./routes/imagesRoutes");


app.use(express.json());

app.use("/", projetRoutes);
app.use("/", eleveRoutes);
app.use("/", typesprojetRoutes);
app.use("/", imagesRoutes);

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});