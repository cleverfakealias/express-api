import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslintParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: '.',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            'prettier': prettier,
        },
        rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/prefer-const': 'error',
            '@typescript-eslint/no-inferrable-types': 'error',
            'prettier/prettier': 'error',
            'prefer-const': 'error',
            'no-var': 'error',
        },
    },
    {
        files: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
];