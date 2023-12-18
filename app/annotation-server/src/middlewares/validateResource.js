const validateResource = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (e) {
    return res.status(400).json({ message: "Invalid schema", error: e.errors });
  }
};

module.exports = validateResource;
