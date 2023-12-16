const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../utils/db");

class Annotation extends Model {}

Annotation.init(
  {
    context: {
      type: DataTypes.STRING(),
    },
    id: {
      type: DataTypes.STRING(),
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(),
    },
    body: {
      type: DataTypes.JSON(),
    },
    target: {
      type: DataTypes.JSON(),
    },
  },
  {
    sequelize,
    modelName: "annotation",
    timestamps: true,
  }
);

module.exports = Annotation;
