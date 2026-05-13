// tests/seeds/userInstituteRoles.seed.js

import pool from '../../src/db/index.js';

export default async function seedUserInstituteRoles() {

    await pool.query(`

        INSERT INTO user_institute_roles
        (
            tenant_id,
            institute_id,
            user_id,
            role_id,
            is_primary
        )

        VALUES

        (
            (SELECT tenant_id FROM tenants WHERE code='EP'),
            (SELECT inst_id FROM institutes WHERE code='EP-MAIN'),
            (SELECT id FROM users WHERE email='raj@scos.com'),
            (SELECT id FROM roles WHERE code='SUPER ADMIN'),
            true
        ),

        (
            (SELECT tenant_id FROM tenants WHERE code='DPS'),
            (SELECT inst_id FROM institutes WHERE code='DPS-NGP'),
            (SELECT id FROM users WHERE email='priya@scos.com'),
            (SELECT id FROM roles WHERE code='INSTITUTE ADMIN'),
            true
        ),

        (
            (SELECT tenant_id FROM tenants WHERE code='DPS'),
            (SELECT inst_id FROM institutes WHERE code='DPS-NGP'),
            (SELECT id FROM users WHERE email='priya@scos.com'),
            (SELECT id FROM roles WHERE code='TRAINER'),
            false
        )

        ON CONFLICT DO NOTHING;

    `);

    console.log(' User Institute Roles Seeded');
}