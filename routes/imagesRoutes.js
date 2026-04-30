// Fait par Céleste B.
const express = require("express");

const router = express.Router();

const imagesController = require("../controllers/imagesController");

router.get("/ImageProjet", imagesController.getImages);
router.post("/ImageProjet", imagesController.addImages)
router.delete("/imageProjet/:id", imagesController.deleteImages);
router.put('/imageProjet/:id', imagesController.updateImages);

module.exports = router;