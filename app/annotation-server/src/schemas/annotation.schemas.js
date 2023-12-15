const { z } = require("zod");

const textPositionSelectorSchema = z.object({
  type: z.literal("TextPositionSelector"),
  start: z.number().int().positive(),
  end: z
    .number()
    .int()
    .positive()
    .refine((end, data) => end >= data.start, {
      message: "End must be greater than or equal to start",
    }),
});

const textQuoteSelectorSchema = z.object({
  type: z.literal("TextQuoteSelector"),
  exact: z.string(),
  prefix: z.string(),
  suffix: z.string(),
});

const selectorSchema = textQuoteSelectorSchema.or(textPositionSelectorSchema);

const targetObjectSchema = z.object({
  source: z.string().url,
  selector: selectorSchema,
});

const targetUriSchema = z.string().url();

const targetSchema = targetUriSchema.or(targetObjectSchema);

const bodyUriSchema = z.string().url();

const bodyObjectSchema = z.object({
  type: z.string().refine((value) => value === "TextualBody", {
    message: 'Type must be "TextualBody"',
  }),
  value: z.string().min(1, { message: "Value is required" }),
  format: z.string().refine((value) => value === "text/plain", {
    message: 'Format must be "text/plain"',
  }),
});

const bodySchema = bodyUriSchema.or(bodyObjectSchema);

const createAnnotationSchema = z.object({
  body: z
    .object({
      context: z.string(),
      type: z.string(),
      body: bodySchema,
      target: targetSchema,
    })
    .refine((data) => data.type === "Annotation", {
      message: "Type must be 'Annotation'",
    }),
});

const getAnnotationSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const updateAnnotationSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    body: bodySchema,
  }),
});

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
