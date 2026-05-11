// Fait par Céleste B.
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const imagesController = require("../controllers/imagesController");

router.use(authMiddleware);

router.get("/ImageProjet", imagesController.getImages);
router.post("/ImageProjet", imagesController.addImages)
router.delete("/imageProjet/:id", imagesController.deleteImages);
router.put('/imageProjet/:id', imagesController.updateImages);

module.exports = router;