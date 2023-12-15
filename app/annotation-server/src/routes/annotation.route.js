const express = require("express");
const annotationController = require("../controllers/annotation.controller");

const router = express.Router();

router.get("/annotation/:id", annotationController.getAnnotation);
router.get("/annotation", annotationController.getAnnotations);
router.post("/annotation", annotationController.createAnnotation);
router.patch("/annotation/:id", annotationController.updateAnnotation);
router.delete("/annotation/:id", annotationController.deleteAnnotation);

module.exports = router;
