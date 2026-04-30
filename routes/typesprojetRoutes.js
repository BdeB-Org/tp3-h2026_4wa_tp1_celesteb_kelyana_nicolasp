// Fait par Céleste B. ROUTES
const express = require("express");

const router = express.Router();

const typesProjetController = require("../controllers/typesprojetControllers");

router.get("/TypeProjet", typesProjetController.getTypeProjet);
router.post("/TypeProjet", typesProjetController.addTypeProjet)
router.delete("/TypeProjet/:id", typesProjetController.deleteTypeProjet);
router.put("/TypeProjet/:id", typesProjetController.updateTypeProjet);

module.exports = router;