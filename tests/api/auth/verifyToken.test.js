import request from 'supertest';
import app from '../../../src/app.js';
import { login } from '../../helpers/auth.helper.js';
import { TEST_USERS } from '../../helpers/testUsers.js';

describe('Verify Token Middleware', () => {

    const fakeUserId = '11111111-1111-1111-1111-111111111111';

    it('should reject request without token', async () => {
        const res = await request(app)
            .get(`/uir/users/${fakeUserId}/institute-roles`);

        expect(res.status).toBe(401);
    });

    it('should reject invalid token', async () => {
        const res = await request(app)
            .get(`/uir/users/${fakeUserId}/institute-roles`)
            .set('Authorization', 'Bearer invalidtoken');

        expect(res.status).toBe(401);
    });

    it('should accept valid token', async () => {
        const auth = await login(TEST_USERS.raj);

        const res = await request(app)
            .get(`/uir/users/${auth.user.id}/institute-roles`)
            .set('Authorization', `Bearer ${auth.token}`);

        expect(res.status).toBe(200);
    });

});