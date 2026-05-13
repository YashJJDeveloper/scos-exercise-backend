import request from 'supertest';
import app from '../../src/app.js';

export const login = async (user) => {

    const response = await request(app)
        .post('/auth/login')
        .send({
            email: user.email,
            password: user.password,
        });

    if (response.status !== 200) {

        console.error('LOGIN FAILED:', response.body);

        throw new Error(`Login failed for ${user.email}`);
    }

    return {
        token: response.body.token,
        user: response.body.user,
        response,
    };
};

export const getAuthToken = async (user) => {

    const auth = await login(user);

    return auth.token;
};