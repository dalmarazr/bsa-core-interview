const request = require('supertest');
const { server, app } = require("../index");
const { database } = require('../database');

jest.mock('../database');

describe('Car API', () => {
    beforeEach(() => {
        database.getAll.mockClear();
        database.getOne.mockClear();
        database.create.mockClear();
        database.update.mockClear();
        database.partialUpdate.mockClear();
        database.delete.mockClear();
        database.getElementById.mockClear();
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should get all cars', async () => {
        database.getAll.mockReturnValue([
            { 
                id: 1,
                make: 'Car 1' ,
                model: 'Model 1',
                year: 2021,
                color: 'Red',
                vin: '1234'
            }
        ]);
        const response = await request(app).get('/cars'); 
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { 
                id: 1,
                make: 'Car 1' ,
                model: 'Model 1',
                year: 2021,
                color: 'Red',
                vin: '1234'
            }
        ]);
    });

    it('should get a car by ID', async () => {
        database.getOne.mockReturnValue({ id: 1, name: 'Car 1' });
        const response = await request(app).get('/cars/1'); 
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, name: 'Car 1' });
    });

    it('should create a new car', async () => {
        database.create.mockReturnValue(1);
        const response = await request(app) 
            .post('/cars')
            .send({
                make: 'Car 2',
                model: 'Model 2',
                year: 2025,
                color: 'Blue',
                vin: '780'
            });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            message: 'created successfully',
            id: 1,
        });
    });

    it('should replace the data of a car by ID', async () => {
        const response = await request(app) 
            .put('/cars/1')
            .send({ 
                make: 'Car 2',
                model: 'Model 2',
                year: 2025,
                color: 'Blue',
                vin: '780'
            });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'resource replaced successfully',
            id: '1',
        });
    });

    it('should update a car by ID', async () => {
        const response = await request(app) 
            .patch('/cars/1')
            .send({ 
                make: 'Car 2',
                vin: '780'
            });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'resource updated successfully',
            id: '1',
        });
    });

    it('should delete a car by ID', async () => {
        const response = await request(app).delete('/cars/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'deleted successfully',
            id: '1',
        });
    });

    it('Should return 404 if record not found for PATCH, PUT, DELETE, GET', async () => {
        database.update.mockReturnValue({ error: 'Element not found' });
        database.partialUpdate.mockReturnValue({ error: 'Element not found' });
        database.delete.mockReturnValue({ error: 'Element not found' });
        database.getOne.mockReturnValue(null);
        const patchResponse = await request(app) 
            .patch('/cars/1500')
            .send({ 
                make: 'Car 2',
                vin: '780'
            });
        console.log( {
            status: patchResponse.status,
            body: patchResponse.body
        })
        expect(patchResponse.status).toBe(404);
        expect(patchResponse.body).toEqual({
            message: 'Element not found',
        });

        const putResponse = await request(app) 
            .put('/cars/999')
            .send({ 
                make: 'Car 2',
                model: 'Model 2',
                year: 2025,
                color: 'Blue',
                vin: '780'
            });
        expect(putResponse.status).toBe(404);
        expect(putResponse.body).toEqual({
            message: 'Element not found',
        });

        const deleteResponse = await request(app) 
            .delete('/cars/999');
        expect(deleteResponse.status).toBe(404);
        expect(deleteResponse.body).toEqual({
            message: 'Element not found',
        });

        const getResponse = await request(app).get('/cars/999');
        expect(getResponse.status).toBe(404);
    });


});
