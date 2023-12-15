const { v4: uuidv4 } = require("uuid");
const Annotation = require("../models/annotation.model");

async function annotationWithIdExists(id) {
  const annotation = await Annotation.findOne({
    where: { id: id },
  });
  return annotation !== null;
}

async function getAnnotations() {
  const annotations = await Annotation.findAll();
  return annotations;
}

async function getAnnotation(id) {
  const annotation = await Annotation.findOne({
    where: { id: id },
  });
  return annotation;
}

async function createAnnotation(body) {
  const annotation_id = uuidv4();

  const annotation = await Lawyer.create({
    context: body.context,
    id: annotation_id,
    type: body.type,
    body: body.body,
    target: body.target,
  });

  return annotation;
}

async function updateAnnotation(id, body) {
  const result = await Lawyer.update(
    { body: body.body },
    {
      where: {
        id: id,
      },
    }
  );
  console.log(result);
  return;
  //return annotation !== null;
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
