const { z } = require("zod");
/**
 * @openapi
 * components:
 *   schemas:
 *     TextPositionSelector:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [TextPositionSelector]
 *           required: true
 *         start:
 *           type: number
 *           required: true
 *         end:
 *           type: number
 *           required: true
 *
 *     TextQuoteSelector:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [TextQuoteSelector]
 *           required: true
 *         exact:
 *           type: string
 *           required: true
 *         prefix:
 *           type: string
 *           required: true
 *         suffix:
 *           type: string
 *           required: true
 *
 *     Selector:
 *       oneOf:
 *         - $ref: "#/components/schemas/TextPositionSelector"
 *         - $ref: "#/components/schemas/TextQuoteSelector"
 *
 *     TargetUri:
 *       type: string
 *       format: uri
 *       required: true
 *
 *     TargetObject:
 *       type: object
 *       properties:
 *         source:
 *           type: string
 *           format: uri
 *           required: true
 *         selector:
 *           $ref: "#/components/schemas/Selector"
 *           required: true
 *
 *     Target:
 *       oneOf:
 *         - $ref: "#/components/schemas/TargetUri"
 *         - $ref: "#/components/schemas/TargetObject"
 *
 *     BodyUri:
 *       type: string
 *       format: uri
 *       required: true
 *
 *     BodyObject:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [TextualBody]
 *           required: true
 *         value:
 *           type: string
 *           required: true
 *         format:
 *           type: string
 *           enum: [text/plain]
 *           required: true
 *
 *     Body:
 *       oneOf:
 *         - $ref: "#/components/schemas/BodyUri"
 *         - $ref: "#/components/schemas/BodyObject"
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     TextPositionSelector:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [TextPositionSelector]
 *           required: true
 *         start:
 *           type: number
 *           required: true
 *         end:
 *           type: number
 *           required: true
 */

const textPositionSelectorSchema = z
  .object({
    type: z.literal("TextPositionSelector"),
    start: z.number().int().positive(),
    end: z.number().int().positive(),
  })
  .refine((data) => data.end >= data.start, {
    message: "End must be greater than or equal to start",
  });

/**
 * @openapi
 * components:
 *   schemas:
 *     TextQuoteSelector:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [TextQuoteSelector]
 *           required: true
 *         exact:
 *           type: string
 *           required: true
 *         prefix:
 *           type: string
 *           required: true
 *         suffix:
 *           type: string
 *           required: true
 */

const textQuoteSelectorSchema = z.object({
  type: z.literal("TextQuoteSelector"),
  exact: z.string(),
  prefix: z.string(),
  suffix: z.string(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     Selector:
 *       oneOf:
 *         - $ref: "#/components/schemas/TextPositionSelector"
 *         - $ref: "#/components/schemas/TextQuoteSelector"
 */

const selectorSchema = textPositionSelectorSchema.or(textQuoteSelectorSchema);

/**
 * @openapi
 * components:
 *   schemas:
 *     TargetObject:
 *       type: object
 *       properties:
 *         source:
 *           type: string
 *           format: uri
 *           required: true
 *         selector:
 *           $ref: "#/components/schemas/Selector"
 *           required: true
 */

const targetObjectSchema = z.object({
  source: z.string().url(),
  selector: selectorSchema,
});

/**
 * @openapi
 * components:
 *   schemas:
 *     TargetUri:
 *       type: string
 *       format: uri
 *       required: true
 */

const targetUriSchema = z.string().url();

/**
 * @openapi
 * components:
 *   schemas:
 *     Target:
 *       oneOf:
 *         - $ref: "#/components/schemas/TargetUri"
 *         - $ref: "#/components/schemas/TargetObject"
 */

const targetSchema = targetUriSchema.or(targetObjectSchema);

/**
 * @openapi
 * components:
 *   schemas:
 *     BodyUri:
 *       type: string
 *       format: uri
 *       required: true
 */

const bodyUriSchema = z.string().url();

/**
 * @openapi
 * components:
 *   schemas:
 *     BodyObject:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [TextualBody]
 *           required: true
 *         value:
 *           type: string
 *           required: true
 *         format:
 *           type: string
 *           enum: [text/plain]
 *           required: true
 */

const bodyObjectSchema = z.object({
  type: z.string().refine((value) => value === "TextualBody", {
    message: 'Type must be "TextualBody"',
  }),
  value: z.string().min(1, { message: "Value is required" }),
  format: z.string().refine((value) => value === "text/plain", {
    message: 'Format must be "text/plain"',
  }),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     Body:
 *       oneOf:
 *         - $ref: "#/components/schemas/BodyUri"
 *         - $ref: "#/components/schemas/BodyObject"
 */

const bodySchema = bodyUriSchema.or(bodyObjectSchema);

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAnnotationInput:
 *       type: object
 *       required:
 *         - "body"
 *         - "target"
 *         - "creator"
 *       properties:
 *         body:
 *           $ref: "#/components/schemas/Body"
 *           description: The relationship between an Annotation and its Body
 *         target:
 *           $ref: "#/components/schemas/Target"
 *           required: true
 *           description: The relationship between an Annotation and its Target
 *         creator:
 *           type: string
 *           description: Person who creates the annotation
 *     CreateAnnotationResponse:
 *       type: object
 *       required:
 *         - "@context"
 *         - "id"
 *         - "type"
 *         - "target"
 *         - "createdAt"
 *         - "updatedAt"
 *       properties:
 *         "@context":
 *           type: string
 *           description: Context of annotation defined by w3c
 *         id:
 *           type: string
 *           description: Id of the annotation, uniquely describes the annotation.
 *         type:
 *           type: string
 *           description: The type of the annotation --> must be "Annotation"
 *         target:
 *           $ref: "#/components/schemas/Target"
 *           required: true
 *           description: Target of the annotation
 *         body:
 *           $ref: "#/components/schemas/Body"
 *           description: Body of the annotation
 *         creator:
 *           type: string
 *           description: Creator of the annotation
 *         createdAt:
 *           type: string
 *           description: Time when the annotation is created.
 *         updatedAt:
 *           type: string
 *           description: Time when the annotation is updated last.
 */

const createAnnotationSchema = z.object({
  body: z.object({
    body: bodySchema,
    target: targetSchema,
    creator: z.string(),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    GetAnnotationResponse:
 *        type: object
 *        required:
 *            - annotation
 *        properties:
 *            "annotation":
 *               type: object
 *               required:
 *                  - "@context"
 *                  - "id"
 *                  - "type"
 *                  - "target"
 *                  - "createdAt"
 *                  - "updatedAt"
 *               properties:
 *                  "@context":
 *                    type: string
 *                    description: Context of annotation defined by w3c
 *                  id:
 *                    type: string
 *                    description: Id of the annotation, uniquely describes the annotation.
 *                  type:
 *                    type: string
 *                    description: The type of the annotation --> must be "Annotation"
 *                  target:
 *                    $ref: "#/components/schemas/Target"
 *                    required: true
 *                    description: Target of the annotation
 *                  body:
 *                    $ref: "#/components/schemas/Body"
 *                    description: Body of the annotation
 *                  creator:
 *                    type: string
 *                    description: Creator of the annotation
 *                  createdAt:
 *                    type: string
 *                    description: Time when the annotation is created.
 *                  updatedAt:
 *                    type: string
 *                    description: Time when the annotation is updated last.
 *    GetAnnotationsResponse:
 *       type: object
 *       required:
 *         - annotations
 *       properties:
 *         "annotations":
 *            type: array
 *            items:
 *              type: object
 *              required:
 *                - "id"
 *                - "type"
 *                - "target"
 *                - "createdAt"
 *                - "updatedAt"
 *              properties:
 *                "@context":
 *                  type: string
 *                  description: Context of annotation defined by w3c
 *                id:
 *                  type: string
 *                  description: Id of the annotation, uniquely describes the annotation.
 *                type:
 *                  type: string
 *                  description: The type of the annotation --> must be "Annotation"
 *                target:
 *                  $ref: "#/components/schemas/Target"
 *                  required: true
 *                  description: Target of the annotation
 *                body:
 *                  $ref: "#/components/schemas/Body"
 *                  description: Body of the annotation
 *                creator:
 *                  type: string
 *                  description: Creator of the annotation
 *                createdAt:
 *                  type: string
 *                  description: Time when the annotation is created.
 *                updatedAt:
 *                  type: string
 *                  description: Time when the annotation is updated last.
 */

const getAnnotationSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateAnnotationInput:
 *      type: object
 *      required:
 *        - body
 *      properties:
 *        body:
 *           $ref: "#/components/schemas/Body"
 *           description: New body of the annotation
 *    UpdateAnnotationResponse:
 *       type: object
 *       required:
 *         - "@context"
 *         - "id"
 *         - "type"
 *         - "target"
 *         - "createdAt"
 *         - "updatedAt"
 *       properties:
 *         "@context":
 *           type: string
 *           description: Context of annotation defined by w3c
 *         id:
 *           type: string
 *           description: Id of the annotation, uniquely describes the annotation.
 *         type:
 *           type: string
 *           description: The type of the annotation --> must be "Annotation"
 *         target:
 *           $ref: "#/components/schemas/Target"
 *           required: true
 *           description: Target of the annotation
 *         body:
 *           $ref: "#/components/schemas/Body"
 *           description: Body of the annotation
 *         creator:
 *           type: string
 *           description: Creator of the annotation
 *         createdAt:
 *           type: string
 *           description: Time when the annotation is created.
 *         updatedAt:
 *           type: string
 *           description: Time when the annotation is updated last.
 */

const updateAnnotationSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    body: bodySchema,
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    DeleteAnnotationResponse:
 *      type: object
 *      required:
 *        - message
 *      properties:
 *        message:
 *          type: string
 *          example: "Annotation deleted successfully"
 */

const deleteAnnotationSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

module.exports = {
  createAnnotationSchema,
  getAnnotationSchema,
  updateAnnotationSchema,
  deleteAnnotationSchema,
};
