import request from 'supertest';
import {
    describe,
    it,
    expect,
} from '@jest/globals';

import app from '../../../src/app.js';

describe('Security API Tests', () => {

    // =========================
    // SQL Injection
    // =========================

    it('should reject SQL injection login attempt', async () => {

        const response = await request(app)

            .post('/auth/login')

            .send({
                email: `' OR '1'='1`,
                password: `' OR '1'='1`,
            });

        expect([400, 401]).toContain(response.status);

    });

    // =========================
    // Missing Token
    // =========================

    it('should reject request without token', async () => {

        const fakeUserId =
            '11111111-1111-1111-1111-111111111111';

        const response = await request(app)

            .get(
                `/uir/users/${fakeUserId}/institute-roles`
            );

        expect(response.status).toBe(401);

    });

    // =========================
    // Invalid Token
    // =========================

    it('should reject invalid token', async () => {

        const fakeUserId =
            '11111111-1111-1111-1111-111111111111';

        const response = await request(app)

            .get(
                `/uir/users/${fakeUserId}/institute-roles`
            )

            .set(
                'Authorization',
                'Bearer invalidtoken'
            );

        expect(response.status).toBe(401);

    });

    // =========================
    // Missing Bearer Prefix
    // =========================

    it('should reject token without Bearer prefix', async () => {

        const fakeUserId =
            '11111111-1111-1111-1111-111111111111';

        const response = await request(app)

            .get(
                `/uir/users/${fakeUserId}/institute-roles`
            )

            .set(
                'Authorization',
                'invalidtoken'
            );

        expect(response.status).toBe(401);

    });

    // =========================
    // Empty Authorization Header
    // =========================

    it('should reject empty authorization header', async () => {

        const fakeUserId =
            '11111111-1111-1111-1111-111111111111';

        const response = await request(app)

            .get(
                `/uir/users/${fakeUserId}/institute-roles`
            )

            .set(
                'Authorization',
                ''
            );

        expect(response.status).toBe(401);

    });

});