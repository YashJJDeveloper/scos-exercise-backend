import request from 'supertest';
import { describe, it, expect } from '@jest/globals';

import app from '../../../src/app.js';

import { TEST_USERS } from '../../helpers/testUsers.js';
import { login } from '../../helpers/auth.helper.js';

describe('Users API', () => {

    Object.entries(TEST_USERS).forEach(([role, userData]) => {

        it(`should fetch institute roles for ${role}`, async () => {

            // LOGIN
            const auth = await login(userData);

            expect(auth.token).toBeDefined();
            expect(auth.user).toBeDefined();

            // API CALL
            const response = await request(app)
                .get(`/uir/users/${auth.user.id}/institute-roles`)
                .set('Authorization', `Bearer ${auth.token}`);

            console.log(`${role} RESPONSE:`, response.body);

            // ASSERTIONS
            expect(response.status).toBe(200);

            expect(Array.isArray(response.body))
                .toBe(true);
        });

    });

});