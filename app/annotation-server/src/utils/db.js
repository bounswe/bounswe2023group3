const { Sequelize } = require("sequelize");

const dbUri = process.env.DB_URI;
console.log(dbUri);
// Set up Sequelize instance
exports.sequelize = new Sequelize(dbUri);

exports.connect = async function () {
  try {
    await exports.sequelize.authenticate();
    console.log("DB connected");
    await exports.sequelize.sync(); // Sync models with the database
  } catch (error) {
    console.error("Could not connect to db", error);
    process.exit(1);
  }
};
