'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendant.belongsTo(models.User, { foreignKey: "UserId" })
    }
  };
  Attendant.init({
    date: DataTypes.STRING,
    week: DataTypes.STRING,
    checkIn: DataTypes.STRING,
    checkOut: DataTypes.STRING,
    description: DataTypes.STRING,
    isHoliday: DataTypes.BOOLEAN,
    isAbsense: DataTypes.BOOLEAN,
    month: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Attendant',
    tableName: 'AttendantS',
    underscored: true,
  });
  return Attendant;
};