import request from 'supertest';
import app from '../../../src/app.js';
import { login } from '../../helpers/auth.helper.js';
import { TEST_USERS } from '../../helpers/testUsers.js';

describe('Full Onboarding Flow', () => {

    it('should complete login → institute → role flow', async () => {

        const auth = await login(TEST_USERS.raj);

        const res = await request(app)
            .get(`/uir/users/${auth.user.id}/institute-roles`)
            .set('Authorization', `Bearer ${auth.token}`);

        expect(res.status).toBe(200);
    });

});