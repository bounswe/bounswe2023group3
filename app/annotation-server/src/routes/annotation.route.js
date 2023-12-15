const express = require("express");
const annotationController = require("../controllers/annotation.controller");
const validateResource = require("../middlewares/validateResource");
const annotationSchemas = require("../schemas/annotation.schemas");

const router = express.Router();

router.get(
  "/annotation/:id",
  validateResource(annotationSchemas.getAnnotationSchema),
  annotationController.getAnnotation
);
router.get("/annotation", annotationController.getAnnotations);
router.post(
  "/annotation",
  validateResource(annotationSchemas.createAnnotationSchema),
  annotationController.createAnnotation
);
router.patch(
  "/annotation/:id",
  validateResource(annotationSchemas.updateAnnotationSchema),
  annotationController.updateAnnotation
);
router.delete(
  "/annotation/:id",
  validateResource(annotationSchemas.deleteAnnotationSchema),
  annotationController.deleteAnnotation
);

module.exports = router;
