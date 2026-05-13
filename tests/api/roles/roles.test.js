import request from 'supertest';
import {
    describe,
    it,
    expect,
    beforeAll
} from '@jest/globals';

import app from '../../../src/app.js';

import { login } from '../../helpers/auth.helper.js';
import { TEST_USERS } from '../../helpers/testUsers.js';

describe('Roles API', () => {

    let auth;

    beforeAll(async () => {

        auth = await login(TEST_USERS.raj);

    });

    // TC_API_025
    // TC_API_035

    it('should fetch roles', async () => {

        const response = await request(app)

            .get('/roles')

            .set(
                'Authorization',
                `Bearer ${auth.token}`
            );

        expect(response.status).toBe(200);

        expect(Array.isArray(response.body))
            .toBe(true);

        // multi-role / non-empty validation
        expect(response.body.length)
            .toBeGreaterThan(0);

        // basic structure validation
        const role = response.body[0];

        expect(role).toHaveProperty('id');

        expect(role).toHaveProperty('name');

    });

    // TC_API_050

    it('should reject roles without token', async () => {

        const response = await request(app)

            .get('/roles');

        expect(response.status).toBe(401);

    });

    it('should reject invalid token', async () => {

        const response = await request(app)

            .get('/roles')

            .set(
                'Authorization',
                'Bearer invalidtoken'
            );

        expect(response.status).toBe(401);

    });

});