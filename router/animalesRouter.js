const express = require("express");
const router = express.Router();
const animalesController = require("../controller/AnimalesController.js")

router.get("", animalesController.getAnimnales)
router.post("/add", animalesController.postAnimales)
router.put("/update/:id", animalesController.updateInformation)
router.delete('/delete/:id', animalesController.deleteAnimale)

module.exports = router