import globalSetup from "./tests/setup/testSetup.js";

export default {
    testEnvironment: 'node',

    testMatch: [
        '**/tests/**/*.test.js',
    ],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    verbose: true,
    globalSetup: './tests/setup/testSetup.js'

};