// tests/seeds/institutes.seed.js

import pool from '../../src/db/index.js';

export default async function seedInstitutes() {

    await pool.query(`
        INSERT INTO institutes
        (tenant_id, name, code, type, subtype)

        VALUES

        ((SELECT tenant_id FROM tenants WHERE code='EP'),
        'EP Main Campus',
        'EP-MAIN',
        'Institute',
        'Programming'),

        ((SELECT tenant_id FROM tenants WHERE code='EP'),
        'EP Robotics Lab',
        'EP-ROBO',
        'Institute',
        'Robotics'),

        ((SELECT tenant_id FROM tenants WHERE code='BHAVANS'),
        'Bhavans Nagpur',
        'BHAVANS-NGP',
        'School',
        'CBSE'),

        ((SELECT tenant_id FROM tenants WHERE code='BHAVANS'),
        'Bhavans Wardha',
        'BHAVANS-WRD',
        'School',
        'State Board'),

        ((SELECT tenant_id FROM tenants WHERE code='DPS'),
        'DPS Delhi Main',
        'DPS-DEL',
        'School',
        'CBSE'),

        ((SELECT tenant_id FROM tenants WHERE code='DPS'),
        'DPS Nagpur',
        'DPS-NGP',
        'School',
        'CBSE'),

        ((SELECT tenant_id FROM tenants WHERE code='DAV'),
        'DAV Rao Main',
        'DAV-MAIN',
        'School',
        'CBSE'),

        ((SELECT tenant_id FROM tenants WHERE code='DAV'),
        'DAV Rao Junior Wing',
        'DAV-JR',
        'School',
        'Primary')

        ON CONFLICT (code) DO NOTHING;
    `);

    console.log('✅ Institutes Seeded');
}