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
      Attendant.belongsTo(models.Calendar, { foreignKey: "CalendarId" })
      Attendant.belongsTo(models.Calendars2024, { foreignKey: "CalendarId" })
    }
  };
  Attendant.init({
    checkIn: DataTypes.BIGINT,
    checkOut: DataTypes.BIGINT,
    isAbsense: DataTypes.BOOLEAN,
    isAttendant: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    CalendarId: DataTypes.INTEGER,
    year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attendant',
    tableName: 'Attendants',
    underscored: true,
  });
  return Attendant;
};