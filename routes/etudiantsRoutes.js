// Fait par Nicolas
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const eleveController = require("../controllers/etudiantControllers");

router.use(authMiddleware);

router.get("/Eleve", eleveController.getEleve);
router.get("/Eleve/:id", eleveController.getEleveById);
router.post("/Eleve", eleveController.addEleve);
router.put("/Eleve/:id", eleveController.updateEleve);
router.delete("/Eleve/:id", eleveController.deleteEleve);

module.exports = router;

