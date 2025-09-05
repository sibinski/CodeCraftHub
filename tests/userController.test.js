// tests/userController.test.js
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/userModel');

describe('User Controller', () => {
    beforeEach(async () => {
        await User.deleteMany(); // Clear the database before each test
    });

    test('User registration', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    });

    test('User login', async () => {
        await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        const response = await request(app)
            .post('/api/users/login')
            .send({ email: 'test@example.com', password: 'password123' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Login successful');
    });
});