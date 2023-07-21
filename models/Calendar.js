'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Calendar.hasMany(models.Attendant, { foreignKey: "CalendarId" })
    }
  };
  Calendar.init({
    date: DataTypes.STRING,
    week: DataTypes.STRING,
    isHoliday: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    month: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Calendar',
    tableName: 'Calendars',
    underscored: true
  });
  return Calendar;
};