// Fait par Nicolas
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const eleveController = require("../controllers/etudiantControllers");

router.use(authMiddleware);

router.get("/", eleveController.getEleve);
router.get("/:id", eleveController.getEleveById);
router.post("/", eleveController.addEleve);
router.put("/:id", eleveController.updateEleve);
router.delete("/:id", eleveController.deleteEleve);

module.exports = router;

