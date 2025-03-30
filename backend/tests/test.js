const request = require('supertest');
const app = require('../server');
const sequelize = require('../config/database');

const testSwiftCode = 'DZIODZIO123';
const tempSwiftCode = 'TEMP123XXX';

describe('SWIFT Codes API', () => {
  beforeAll(async () => {
    await request(app).post('/v1/swift-codes').send({
      swiftCode: testSwiftCode,
      bankName: 'Test Bank',
      address: 'Test Address',
      countryISO2: 'PL',
      countryName: 'Poland',
      isHeadquarter: true,
    });
  });

  afterAll(async () => {
    await request(app).delete(`/v1/swift-codes/${testSwiftCode}`);
    await request(app).delete(`/v1/swift-codes/${tempSwiftCode}`);
    await sequelize.close();
  });

  it('GET /v1/swift-codes/:swiftCode should return a swift code', async () => {
    const res = await request(app).get(`/v1/swift-codes/${testSwiftCode}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.swiftCode).toBe(testSwiftCode);
    expect(res.body.bankName).toBeDefined();
    expect(res.body.countryISO2).toBeDefined();
    expect(typeof res.body.isHeadquarter).toBe('boolean');
  });

  it('GET /v1/swift-codes/:swiftCode should return 404 for unknown code', async () => {
    const res = await request(app).get('/v1/swift-codes/NONEXISTENT123');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('SWIFT Code not found');
  });

  it('GET /v1/swift-codes/country/:iso2 should return swift codes', async () => {
    const res = await request(app).get('/v1/swift-codes/country/PL');
    expect(res.statusCode).toBe(200);
    expect(res.body.countryISO2).toBe('PL');
    expect(Array.isArray(res.body.swiftCodes)).toBe(true);
    expect(res.body.swiftCodes.length).toBeGreaterThan(0);
  });

  it('POST /v1/swift-codes should reject missing fields', async () => {
    const res = await request(app).post('/v1/swift-codes').send({ swiftCode: 'INCOMPLETE' });
    expect(res.statusCode).toBe(400);
  });

  it('POST /v1/swift-codes should create a new entry', async () => {
    const res = await request(app).post('/v1/swift-codes').send({
      swiftCode: tempSwiftCode,
      bankName: 'Temp Bank',
      address: 'Temp Address',
      countryISO2: 'PL',
      countryName: 'Poland',
      isHeadquarter: false,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/created/i);
  });

  it('GET created swift code', async () => {
    const res = await request(app).get(`/v1/swift-codes/${tempSwiftCode}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.swiftCode).toBe(tempSwiftCode);
    expect(res.body.isHeadquarter).toBe(false);
  });

  it('DELETE /v1/swift-codes/:swiftCode should delete the entry', async () => {
    const res = await request(app).delete(`/v1/swift-codes/${tempSwiftCode}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

  it('DELETE again should return 404', async () => {
    const res = await request(app).delete(`/v1/swift-codes/${tempSwiftCode}`);
    expect(res.statusCode).toBe(404);
  });

  it('GET HQ with branches should return branches array (if any)', async () => {
    const res = await request(app).get('/v1/swift-codes/ALBPPLPWXXX');
    expect(res.statusCode).toBe(200);
    expect(res.body.isHeadquarter).toBe(true);
    expect(Array.isArray(res.body.branches)).toBe(true);
  });
});
