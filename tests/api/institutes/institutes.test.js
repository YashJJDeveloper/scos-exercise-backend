import request from 'supertest';
import {
    describe,
    it,
    expect,
    beforeAll,
    afterAll
} from '@jest/globals';

import pool from '../../../src/db/index.js';
import app from '../../../src/app.js';

import { login } from '../../helpers/auth.helper.js';
import { TEST_USERS } from '../../helpers/testUsers.js';

describe('User Institutes API', () => {

    let auth;
    let userId;

    beforeAll(async () => {

        auth = await login(TEST_USERS.raj);

        userId = auth.user.id;

    });

    // TC_API_021
    it('should fetch user institutes', async () => {

        const response = await request(app)

            .get(`/uir/users/${userId}/institutes`)

            .set(
                'Authorization',
                `Bearer ${auth.token}`
            );

        expect(response.status).toBe(200);

        expect(Array.isArray(response.body))
            .toBe(true);

    });

    // TC_API_034
    it('should fetch institutes for multi institute user', async () => {

        const response = await request(app)

            .get(`/uir/users/${userId}/institutes`)

            .set(
                'Authorization',
                `Bearer ${auth.token}`
            );

        expect(response.status).toBe(200);

        expect(Array.isArray(response.body))
            .toBe(true);

    });

    // TC_API_029
    it('should reject institutes request without token', async () => {

        const response = await request(app)

            .get(`/uir/users/${userId}/institutes`);

        expect(response.status).toBe(401);

    });

});

