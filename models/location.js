'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Location.init({
    name: DataTypes.STRING,
    latitube: DataTypes.DOUBLE,
    longitube: DataTypes.DOUBLE,
    isChoose: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Location',
    tableName: 'Locations',
    underscored: true,
  });
  return Location;
};