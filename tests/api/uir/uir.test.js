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

describe('UIR CRUD API', () => {

    let auth;
    let userId;

    const tenantId = 'edfc127b-d9e6-4956-91a3-513268dd0544';

    const instituteId =
        'fc423bb4-0b52-4cdc-a29e-688c66a45b1c';

    const roleId =
        'ca5471b5-e98d-4f54-adcd-34010364c405';

    // REAL SECOND ROLE UUID
    const updatedRoleId =
        'ca5471b5-e98d-4f54-adcd-34010364c405';

    beforeAll(async () => {

        auth = await login(TEST_USERS.raj);

        userId = auth.user.id;

    });

    // CREATE

    it('should create user institute role', async () => {

        const response = await request(app)

            .post(
                `/uir/tenants/${tenantId}/institutes/${instituteId}/users/${userId}/role`
            )

            .set(
                'Authorization',
                `Bearer ${auth.token}`
            )

            .send({
                roleId: roleId,
                is_primary: true,
            });

        expect(response.status).toBe(200);

        expect(response.body.user_id)
            .toBe(userId);

    });

    // READ ALL

    it('should fetch user institute roles', async () => {

        const response = await request(app)

            .get(`/uir/users/${userId}/institute-roles`)

            .set(
                'Authorization',
                `Bearer ${auth.token}`
            );

        expect(response.status).toBe(200);

        expect(Array.isArray(response.body))
            .toBe(true);

    });

    // READ SINGLE

    it('should fetch single user institute role', async () => {

        const response = await request(app)

            .get(
                `/uir/tenants/${tenantId}/institutes/${instituteId}/users/${userId}/role`
            )

            .set(
                'Authorization',
                `Bearer ${auth.token}`
            );

        expect(response.status).toBe(200);

    });

    // UPDATE

    it('should update user institute role', async () => {

        const response = await request(app)

            .put(
                `/uir/tenants/${tenantId}/institutes/${instituteId}/users/${userId}/role`
            )

            .set(
                'Authorization',
                `Bearer ${auth.token}`
            )

            .send({
                roleId: updatedRoleId,
                is_primary: false,
            });

        expect(response.status).toBe(200);

    });

    // DELETE

    it('should delete user institute role', async () => {

        const response = await request(app)

            .delete(
                `/uir/tenants/${tenantId}/institutes/${instituteId}/users/${userId}/role`
            )

            .set(
                'Authorization',
                `Bearer ${auth.token}`
            );

        expect(response.status).toBe(200);

    });

});

