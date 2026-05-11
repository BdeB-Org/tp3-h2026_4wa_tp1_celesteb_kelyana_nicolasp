// Fait par Kelyan
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const projetController = require("../controllers/projetController");

router.use(authMiddleware);

router.get("/", projetController.getProjet);
router.get("/:id", projetController.getProjetById);
router.post("/", projetController.addProjet)
router.delete("/:id", projetController.deleteProjet);
router.put("/:id", projetController.updateProjet);

module.exports = router;