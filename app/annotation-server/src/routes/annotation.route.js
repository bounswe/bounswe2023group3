const express = require("express");
const annotationController = require("../controllers/annotation.controller");
const validateResource = require("../middlewares/validateResource");
const annotationSchemas = require("../schemas/annotation.schemas");

const router = express.Router();

/**
 * @openapi
 * '/annotation/:id':
 *  get:
 *    tags:
 *     - Annotation
 *    summary: Get annotation with given id
 *    parameters:
 *    - in: path
 *      name: id
 *      description: Annotation id
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Annotation is fetched successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetAnnotationResponse'
 *      400:
 *        description: Incorrect payload
 *      404:
 *        description: Annotation not found.
 *      500:
 *        description: Internal server error
 */

router.get(
  "/annotation/:id",
  validateResource(annotationSchemas.getAnnotationSchema),
  annotationController.getAnnotation
);

/**
 * @openapi
 * '/annotation':
 *  get:
 *    tags:
 *     - Annotation
 *    summary: Get all annotations
 *    responses:
 *      200:
 *        description: Annotations are fetched successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetAnnotationsResponse'
 *      500:
 *        description: Internal server error
 */

router.get("/annotation", annotationController.getAnnotations);

/**
 * @openapi
 * '/annotation':
 *  post:
 *    tags:
 *     - Annotation
 *    summary: Create new annotation
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            GetAnnotationInputWrapper:
 *              type: object
 *              required:
 *              - annotation
 *            $ref: '#/components/schemas/CreateAnnotationInput'
 *    responses:
 *      201:
 *        description: Annotation created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateAnnotationResponse'
 *      400:
 *        description: Incorrect payload
 *      500:
 *        description: Internal server error
 */

router.post(
  "/annotation",
  validateResource(annotationSchemas.createAnnotationSchema),
  annotationController.createAnnotation
);

/**
 * @openapi
 * '/annotation/:id':
 *  patch:
 *    tags:
 *     - Annotation
 *    summary: Create new annotation
 *    parameters:
 *    - in: path
 *      name: id
 *      description: Annotation id
 *      required: true
 *      schema:
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateAnnotationInput'
 *    responses:
 *      200:
 *        description: Annotation updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateAnnotationResponse'
 *      400:
 *        description: Incorrect payload
 *      404:
 *        description: Annotation not found.
 *      500:
 *        description: Internal server error
 */

router.patch(
  "/annotation/:id",
  validateResource(annotationSchemas.updateAnnotationSchema),
  annotationController.updateAnnotation
);

/**
 * @openapi
 * '/annotation/:id':
 *  delete:
 *    tags:
 *     - Annotation
 *    summary: Delete annotation with given id
 *    parameters:
 *    - in: path
 *      name: id
 *      description: Annotation id
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Annotation deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteAnnotationResponse'
 *      400:
 *        description: Incorrect payload
 *      404:
 *        description: Annotation not found.
 *      500:
 *        description: Internal server error
 */

router.delete(
  "/annotation/:id",
  validateResource(annotationSchemas.deleteAnnotationSchema),
  annotationController.deleteAnnotation
);

module.exports = router;
