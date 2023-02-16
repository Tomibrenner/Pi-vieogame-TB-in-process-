const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      released: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      rating: {
        type: DataTypes.FLOAT,
        validate: {
          min: 0,
          max: 5,
        },
      },
      platforms: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      background_image: {
        type: DataTypes.TEXT,
        defaultValue: "https://i.blogs.es/28d521/the-last-of-us-remastered-review_8pkg.1280/1366_521.jpeg",
        allowNull: true,
      },
      created:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    },
    {
      timestamps: false,
    }
  );
};
