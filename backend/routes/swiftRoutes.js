const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const db = require('../config/database');
const SwiftCode = require('../models/SwiftCode');

router.get('/', async (req, res) => {
    try {
      const records = await SwiftCode.findAll();
  
      res.json(records.map(code => ({
        swiftCode: code.swiftCode,
        bankName: code.bankName,
        address: code.address,
        townName: code.townName,
        countryISO2: code.countryISO2,
        countryName: code.countryName,
        isHeadquarter: code.isHeadquarter ?? false
      })));
    } catch (error) {
      console.error('Error fetching all swift codes:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/:swiftCode', async (req, res) => {
    try {
      const swiftCodeParam = req.params.swiftCode;
  
      const result = await SwiftCode.findOne({
        where: { swiftCode: swiftCodeParam }
      });
  
      if (!result) {
        return res.status(404).json({ message: 'SWIFT Code not found' });
      }
  
      const response = {
        address: result.address,
        bankName: result.bankName,
        countryISO2: result.countryISO2,
        countryName: result.countryName,
        isHeadquarter: result.isHeadquarter ?? false,
        swiftCode: result.swiftCode
      };
  
      if (response.isHeadquarter) {
        const branches = await db.query(
          `SELECT swift_code, bank_name, address, country_iso2, country_name, is_headquarter
           FROM swift_codes
           WHERE bic8 = :bic8 AND swift_code != :swiftCode`,
          {
            replacements: {
              bic8: result.swiftCode.slice(0, 8),
              swiftCode: result.swiftCode
            },
            type: Sequelize.QueryTypes.SELECT
          }
        );
  
        response.branches = branches.map(b => ({
          swiftCode: b.swift_code,
          bankName: b.bank_name,
          address: b.address,
          countryISO2: b.country_iso2,
          countryName: b.country_name,
          isHeadquarter: b.is_headquarter ?? false
        }));
      }
  
      res.json(response);
    } catch (error) {
      console.error('Error fetching swift code:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });  
  
router.get('/country/:iso2', async (req, res) => {
  try {
    const iso2 = req.params.iso2.toUpperCase();

    const codes = await SwiftCode.findAll({
      where: { countryISO2: iso2 }
    });

    if (!codes.length) {
      return res.status(404).json({ message: 'No records found for this country' });
    }

    res.json({
      countryISO2: codes[0].countryISO2,
      countryName: codes[0].countryName,
      swiftCodes: codes.map(code => ({
        address: code.address,
        bankName: code.bankName,
        countryISO2: code.countryISO2,
        isHeadquarter: code.isHeadquarter ?? false,
        swiftCode: code.swiftCode
      }))
    });
  } catch (error) {
    console.error('Error fetching country data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      address, bankName, countryISO2, countryName,
      isHeadquarter, swiftCode
    } = req.body;

    if (!swiftCode || !bankName || !countryISO2 || !countryName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newEntry = await SwiftCode.create({
      swiftCode,
      bic8: swiftCode.slice(0, 8),
      bankName,
      address,
      countryISO2: countryISO2.toUpperCase(),
      countryName: countryName.toUpperCase(),
      isHeadquarter: isHeadquarter ?? null
    });

    res.status(201).json({ message: 'SWIFT Code created' });
  } catch (error) {
    console.error('Error creating swift code:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:swiftCode', async (req, res) => {
  try {
    const swiftCode = req.params.swiftCode;

    const deleted = await SwiftCode.destroy({
      where: { swiftCode }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'SWIFT Code not found' });
    }

    res.json({ message: 'SWIFT Code deleted' });
  } catch (error) {
    console.error('Error deleting swift code:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
