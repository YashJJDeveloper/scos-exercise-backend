// tests/seeds/seed.js

import pool from '../../src/db/index.js';

import seedTenants from './tenants.seed.js';
import seedInstitutes from './institutes.seed.js';
import seedUsers from './users.seed.js';
import seedRoles from './roles.seed.js';
import seedUserInstituteRoles from './userInstituteRoles.seed.js';

const seed = async () => {

    try {

        console.log('🌱 Starting test DB seed...');

        await seedTenants();
        await seedInstitutes();
        await seedUsers();
        await seedRoles();
        await seedUserInstituteRoles();

        console.log('✅ Test DB Seeded Successfully');

        process.exit(0);

    } catch (error) {

        console.error('❌ Seed failed:', error);

        process.exit(1);

    } finally {

        await pool.end();

    }

};

seed();