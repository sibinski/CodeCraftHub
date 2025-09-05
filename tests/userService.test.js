// tests/userService.test.js
const User = require('../src/models/userModel');
const userService = require('../src/services/userService');
const bcrypt = require('bcrypt');

jest.mock('../src/models/userModel');
jest.mock('bcrypt'); // Mock bcrypt

describe('User Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('registerUser - success', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
        bcrypt.hash.mockResolvedValue('mockedHashedPassword'); // Mock bcrypt.hash
        User.prototype.save = jest.fn().mockResolvedValue({ ...userData, password: 'mockedHashedPassword' });

        const result = await userService.registerUser(userData);
        expect(result).toEqual({ message: 'User created successfully' });
        expect(User.prototype.save).toHaveBeenCalled();
    });

    test('loginUser - success', async () => {
        const userData = { email: 'test@example.com', password: 'password123' };
        const user = { email: userData.email, password: 'hashedPasswordFromDatabase' }; // Static hash!
        User.findOne = jest.fn().mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true); // Mock bcrypt.compare to return true

        const result = await userService.loginUser(userData);
        expect(result).toEqual({ message: 'Login successful' });
        expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, user.password);
    });

    test('loginUser - invalid credentials', async () => {
        const userData = { email: 'test@example.com', password: 'wrongpassword' };
        const user = { email: userData.email, password: 'hashedPasswordFromDatabase' }; // Static hash!
        User.findOne = jest.fn().mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(false); // Mock bcrypt.compare to return false

        await expect(userService.loginUser(userData)).rejects.toThrow('Invalid credentials');
        expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, user.password);
    });
});
