'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class year2023 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  };
  year2023.init({
    date: DataTypes.STRING,
    week: DataTypes.STRING,
    isHoliday: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    month: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'year2023',
    tableName: 'year2023s',
    underscored: true
  });
  return year2023;
};