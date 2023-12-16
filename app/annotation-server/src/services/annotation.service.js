const { v4: uuidv4 } = require("uuid");
const Annotation = require("../models/annotation.model");

async function annotationWithIdExists(id) {
  const annotation = await Annotation.findOne({
    where: { id },
  });
  return annotation !== null;
}

async function getAnnotations() {
  const annotations = await Annotation.findAll();
  return annotations;
}

async function getAnnotation(id) {
  console.log("id: ", id);
  const annotation = await Annotation.findOne({
    where: { id: id },
  });
  return annotation;
}

async function createAnnotation(body) {
  const annotation_id = uuidv4();

  const annotation = await Annotation.create({
    context: "http://www.w3.org/ns/anno.jsonld",
    id: annotation_id,
    type: "Annotation",
    body: body.body,
    target: body.target,
  });

  return annotation;
}

async function updateAnnotation(id, body) {
  const [_, [updatedAnnotation]] = await Annotation.update(
    { body: body.body },
    {
      where: {
        id: id,
      },
      returning: true,
    }
  );
  return updatedAnnotation;
}

async function deleteAnnotation(id) {
  Annotation.destroy({
    where: {
      id: id,
    },
  });
}

module.exports = {
  annotationWithIdExists,
  getAnnotations,
  getAnnotation,
  createAnnotation,
  updateAnnotation,
  deleteAnnotation,
};
