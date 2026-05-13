// tests/seeds/roles.seed.js

import pool from '../../src/db/index.js';

export default async function seedRoles() {

    await pool.query(`
        INSERT INTO roles
        (name, code, role_logo)

        VALUES
        ('Super Admin', 'SUPER ADMIN', 'shield_person'),
        ('Institute Admin', 'INSTITUTE ADMIN', 'shield_person'),
        ('Trainer', 'TRAINER', 'Person'),
        ('Student', 'STUDENT', 'Groups 2'),
        ('Parent', 'PARENT', 'Family Restroom'),
        ('Staff', 'STAFF', 'Account Circle')

        ON CONFLICT (code) DO NOTHING;
    `);

    console.log('✅ Roles Seeded');
}