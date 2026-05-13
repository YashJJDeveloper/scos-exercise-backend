// tests/setup/globalSetup.js

import pool from '../../src/db/index.js';

import seedTenants from '../seeds/tenants.seed.js';
import seedInstitutes from '../seeds/institutes.seed.js';
import seedRoles from '../seeds/roles.seed.js';
import seedUsers from '../seeds/users.seed.js';
import seedUserInstituteRoles from '../seeds/userInstituteRoles.seed.js';

export default async function globalSetup() {

    console.log('\n Preparing Test Database...\n');

    try {

        // =========================================
        // CLEAN DATABASE
        // ORDER MATTERS (FK DEPENDENCIES)
        // =========================================

        await pool.query(`
            TRUNCATE TABLE
                user_institute_roles,
                institutes,
                tenants,
                roles,
                users
            RESTART IDENTITY CASCADE;
        `);

        console.log('🧹 Old Test Data Removed');

        // =========================================
        // RUN SEEDS IN CORRECT ORDER
        // =========================================

        // 1. TENANTS
        await seedTenants();
        console.log(' Tenants Seeded');

        // 2. INSTITUTES
        // depends on tenants
        await seedInstitutes();
        console.log(' Institutes Seeded');

        // 3. ROLES
        await seedRoles();
        console.log(' Roles Seeded');

        // 4. USERS
        await seedUsers();
        console.log(' Users Seeded');

        // 5. USER INSTITUTE ROLES
        // depends on all above tables
        await seedUserInstituteRoles();
        console.log(' User Institute Roles Seeded');

        // =========================================
        // OPTIONAL VALIDATION
        // =========================================

        const tenantsCount = await pool.query(
            `SELECT COUNT(*) FROM tenants`
        );

        const institutesCount = await pool.query(
            `SELECT COUNT(*) FROM institutes`
        );

        const usersCount = await pool.query(
            `SELECT COUNT(*) FROM users`
        );

        const rolesCount = await pool.query(
            `SELECT COUNT(*) FROM roles`
        );

        const mappingsCount = await pool.query(
            `SELECT COUNT(*) FROM user_institute_roles`
        );

        console.log('\n Seed Summary');
        console.log('--------------------------------');
        console.log(`Tenants: ${tenantsCount.rows[0].count}`);
        console.log(`Institutes: ${institutesCount.rows[0].count}`);
        console.log(`Users: ${usersCount.rows[0].count}`);
        console.log(`Roles: ${rolesCount.rows[0].count}`);
        console.log(`Mappings: ${mappingsCount.rows[0].count}`);
        console.log('--------------------------------');

        console.log('\n Test Database Ready\n');

    } catch (error) {

        console.error('\n Global Setup Failed\n');
        console.error(error);

        throw error;

    }
}