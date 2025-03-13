const { database } = require('../database');

describe('Database', () => {
    beforeAll(async () => {
        await database.initDatabase();
    });


    it('should get all cars', async () => {
        const cars = database.getAll();
        expect(cars.length).toBe(1000);
    });


    it('should get a car by ID', async () => {
        const car = database.getOne(1);
        expect(car.id).toBe(1);
    });

    it('should create a new car', async () => {
        const newCarId = database.create({
            make: 'Car 2',
            model: 'Model 2',
            year: 2025,
            color: 'Red',
            vin: '1234'
        });
        expect(newCarId).toBe(1001);
    });

    it('should update a car by ID', async () => {
        const result = database.update(1, {
            make: 'CAR TEST',
            model: 'Model 111',
            year: 2025,
            color: 'Red',
            vin: '1234'
        });
        expect(result).toBeUndefined();
    });

    it('should partially update a car by ID', async () => {
        const result = database.partialUpdate(1, {
            make: 'Car 1',
        });
        expect(result).toBeUndefined();
    });


});