import request from 'supertest';
import app from '../../../src/app.js';
import { login } from '../../helpers/auth.helper.js';
import { TEST_USERS } from '../../helpers/testUsers.js';

describe('Users CRUD', () => {

    let token;
    let createdUserId;

    beforeAll(async () => {
        const auth = await login(TEST_USERS.raj);
        token = auth.token;
    });

    it('should get users list', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should get user by id', async () => {
        const res = await request(app)
            .get('/users/84aec80d-98a0-4466-8fd5-58df703d0c79')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBeDefined();
    });

});