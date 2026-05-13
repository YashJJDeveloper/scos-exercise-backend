import request from 'supertest';
import app from '../../../src/app.js';
import { login } from '../../helpers/auth.helper.js';
import { TEST_USERS } from '../../helpers/testUsers.js';

describe('Auth Security Tests', () => {

    it('should reject login with SQL injection attempt', async () => {

        const res = await request(app)
            .post('/auth/login')
            .send({
                email: "' OR 1=1 --",
                password: "123"
            });

        expect(res.status).toBe(401);
    });

    it('should reject missing token on protected route', async () => {

        const res = await request(app)
            .get('/uir/users/some-id/institute-roles');

        expect(res.status).toBe(401);
    });

});