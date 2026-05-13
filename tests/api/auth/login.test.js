import request from 'supertest';
import { describe, it, expect } from '@jest/globals';

import app from '../../../src/app.js';

describe('Login API', () => {


    // TC_API_001 - Valid login

    it('should login valid user', async () => {

        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'raj@scos.com',
                password: 'temp123',
            });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.userId).toBeDefined();
    });


    // TC_API_002 - Invalid password

    it('should reject invalid password', async () => {

        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'raj@scos.com',
                password: 'wrongpass',
            });

        expect(response.status).toBe(401);
    });


    // TC_API_003 - Unknown user

    it('should reject unknown user', async () => {

        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'unknown@test.com',
                password: 'temp123',
            });

        expect(response.status).toBe(401);
    });


    // TC_API_004 - Missing payload (ENHANCED)


    it('should reject missing email', async () => {

        const response = await request(app)
            .post('/auth/login')
            .send({
                password: 'temp123',
            });

        expect(response.status).toBe(400);
    });

    it('should reject missing password', async () => {

        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'raj@scos.com',
            });

        expect(response.status).toBe(400);
    });

    it('should reject empty payload', async () => {

        const response = await request(app)
            .post('/auth/login')
            .send({});

        expect(response.status).toBe(400);
    });

    it('should reject empty email and password', async () => {

        const response = await request(app)
            .post('/auth/login')
            .send({
                email: '',
                password: '',
            });

        expect(response.status).toBe(400);
    });

});