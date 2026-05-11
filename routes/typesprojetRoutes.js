// Fait par Céleste B. ROUTES
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

const typesProjetController = require("../controllers/typesprojetControllers");

router.get("/:id", typesProjetController.getTypeProjetById);
router.get("/", typesProjetController.getTypeProjet);
router.post("/", typesProjetController.addTypeProjet)
router.delete("/:id", typesProjetController.deleteTypeProjet);
router.put("/:id", typesProjetController.updateTypeProjet);

module.exports = router;