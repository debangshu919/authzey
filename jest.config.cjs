/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/test"],
    testMatch: ["**/*.test.ts"],
    clearMocks: true,
    resetModules: true,
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: {
                    module: "commonjs",
                    moduleResolution: "node",
                    esModuleInterop: true,
                    verbatimModuleSyntax: false,
                },
            },
        ],
    },
    collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
    coverageDirectory: "coverage",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
