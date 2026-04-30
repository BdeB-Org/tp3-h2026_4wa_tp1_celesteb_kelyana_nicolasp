// Fait par Kelyan
const express = require("express");

const router = express.Router();

const projetController = require("../controllers/projetController");

router.get("/Projet", projetController.getProjet);
router.post("/Projet", projetController.addProjet)
router.delete("/Projet/:id", projetController.deleteProjet);
router.put("/Projet/:id", projetController.updateProjet);

module.exports = router;