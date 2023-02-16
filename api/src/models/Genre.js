const { DataTypes } = require("sequelize");
/*Exportamos una funcion que define el modelo
  Luego le injectamos la conexion a sequelize.*/
module.exports = (sequelize) => {
  sequelize.define(
    "Genre",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        auteIncrement: true,
        unique: true,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        allowNull: true,
      },
    },
    {
      timestamps: false
    }
  );
};
