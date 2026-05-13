// tests/seeds/tenants.seed.js

import pool from '../../src/db/index.js';

export default async function seedTenants() {

    await pool.query(`
        INSERT INTO tenants (name, code)
        VALUES
        ('Enjoy Programming', 'EP'),
        ('Bhavans School', 'BHAVANS'),
        ('Delhi Public School', 'DPS'),
        ('DAV Rao School', 'DAV')

        ON CONFLICT (code) DO NOTHING;
    `);

    console.log('✅ Tenants Seeded');
}