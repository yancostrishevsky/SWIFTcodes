const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SwiftCode = sequelize.define('SwiftCode', {
  swiftCode: {
    type: DataTypes.STRING,
    primaryKey: true,
    field: 'swift_code'
  },
  bic8: {
    type: DataTypes.STRING,
    field: 'bic8'
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'bank_name'
  },
  address: {
    type: DataTypes.STRING,
    field: 'address'
  },
  townName: {
    type: DataTypes.STRING,
    field: 'town_name'
  },
  countryISO2: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'country_iso2'
  },
  countryName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'country_name'
  },
  isHeadquarter: {
    type: DataTypes.BOOLEAN,
    field: 'is_headquarter'
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'swift_codes',
  timestamps: false
});

module.exports = SwiftCode;
