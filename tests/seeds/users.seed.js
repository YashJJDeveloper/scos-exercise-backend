// tests/seeds/users.seed.js

import pool from '../../src/db/index.js';

export default async function seedUsers() {

    await pool.query(`
        INSERT INTO users
        (
            first_name,
            last_name,
            full_name,
            email,
            password_hash
        )

        VALUES
        ('Alex', 'Jordan', 'Alex Jordan', 'alex@scos.com', 'temp123'),
        ('Raj', 'Sharma', 'Raj Sharma', 'raj@scos.com', 'temp123'),
        ('Priya', 'Mehta', 'Priya Mehta', 'priya@scos.com', 'temp123'),
        ('Amit', 'Verma', 'Amit Verma', 'amit@scos.com', 'temp123'),
        ('Sneha', 'Patil', 'Sneha Patil', 'sneha@scos.com', 'temp123'),
        ('Karan', 'Singh', 'Karan Singh', 'karan@scos.com', 'temp123'),
        ('Neha', 'Gupta', 'Neha Gupta', 'neha@scos.com', 'temp123')

        ON CONFLICT (email) DO NOTHING;
    `);

    console.log('✅ Users Seeded');
}