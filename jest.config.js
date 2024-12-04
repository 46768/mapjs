/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
        '@core/(.*)': '<rootDir>/src/core/$1',
        '@type/(.*)': '<rootDir>/src/type/$1',
        '@utils/(.*)': '<rootDir>/src/utils/$1',
    },
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
}
