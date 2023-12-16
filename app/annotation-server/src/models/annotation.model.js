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
      type: DataTypes.INTEGER,
    },
    target: {
      type: DataTypes.STRING(),
    },
  },
  {
    sequelize,
    modelName: "Annotation",
    timestamps: true,
  }
);

module.exports = Annotation;
