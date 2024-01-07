'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calendars2024 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Calendars2024.hasMany(models.Attendant, { foreignKey: "CalendarId" })
    }
  };
  Calendars2024.init({
    date: DataTypes.STRING,
    week: DataTypes.STRING,
    isHoliday: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    month: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Calendars2024',
    tableName: 'Calendars2024s',
    underscored: true,
  });
  return Calendars2024;
};