const annotationService = require("../services/annotation.service");

async function getAnnotations(req, res) {
  try {
    let { pollIDs } = req.query;
    if (pollIDs) {
      pollIDs = pollIDs.split(",");
      const promises = pollIDs.map((pollId) =>
        annotationService.getAnnotations(pollId)
      );
      const responses = await Promise.all(promises);
      return res.status(200).json({ annotations: [].concat(...responses) });
    } else {
      const annotations = await annotationService.getAnnotations(pollIDs);
      return res.status(200).json({ annotations: annotations });
    }
  } catch (e) {
    console.error("Error getting annotations", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

async function createAnnotation(req, res) {
  try {
    const body = req.body;
    const annotation = await annotationService.createAnnotation(body);
    return res.status(201).json({
      message: "Annotation successfully created",
      annotation: annotation,
    });
  } catch (e) {
    console.error("Error creating annotation", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

async function getAnnotation(req, res) {
  try {
    const { id } = req.params;
    const annotationExists = await annotationService.annotationWithIdExists(id);
    if (!annotationExists) {
      return res
        .status(404)
        .json({ error: `Annotation with id '${id}' could not be found` });
    }

    const annotation = await annotationService.getAnnotation(id);

    return res.status(200).json({ annotation: annotation });
  } catch (e) {
    console.error(`Error getting annotation with id ${id}`, e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

async function updateAnnotation(req, res) {
  const { id } = req.params;
  const body = req.body;

  try {
    const annotationExists = await annotationService.annotationWithIdExists(id);
    if (!annotationExists) {
      return res
        .status(404)
        .json({ error: `Annotation with id ${id} could not found` });
    }

    const annotation = await annotationService.updateAnnotation(id, body);

    return res.status(200).json({
      message: "Annotation successfully updated",
      annotation: annotation,
    });
  } catch (e) {
    console.error(`Error updating annotation with id ${id}`, e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

async function deleteAnnotation(req, res) {
  try {
    const { id } = req.params;
    const annotationExists = await annotationService.annotationWithIdExists(id);
    if (!annotationExists) {
      return res
        .status(404)
        .json({ error: `Annotation with id ${id} could not found` });
    }

    await annotationService.deleteAnnotation(id);

    return res
      .status(200)
      .json({ message: `Annotation with id ${id} is deleted successfully` });
  } catch (e) {
    console.error(`Error deleting annotation with id ${id}`, e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

module.exports = {
  getAnnotation,
  getAnnotations,
  createAnnotation,
  updateAnnotation,
  deleteAnnotation,
};
