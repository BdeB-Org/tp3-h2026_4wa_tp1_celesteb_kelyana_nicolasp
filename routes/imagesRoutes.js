// Fait par Céleste B.
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const imagesController = require("../controllers/imagesController");

router.use(authMiddleware);

router.get("/", imagesController.getImages);
router.get("/:id", imagesController.getImageById);
router.post("/", imagesController.addImages)
router.delete("/:id", imagesController.deleteImages);
router.put('/:id', imagesController.updateImages);

module.exports = router;