import request from 'supertest';
import app from '../../../src/app.js';
import { login } from '../../helpers/auth.helper.js';
import { TEST_USERS } from '../../helpers/testUsers.js';

describe('Auth Me API', () => {

    it('should return user profile', async () => {
        const auth = await login(TEST_USERS.raj);

        const res = await request(app)
            .get('/auth/me')
            .set('Authorization', `Bearer ${auth.token}`);

        expect(res.status).toBe(200);
        expect(res.body.email).toBe(TEST_USERS.raj.email);
    });

    it('should reject without token', async () => {
        const res = await request(app).get('/auth/me');
        expect(res.status).toBe(401);
    });

});