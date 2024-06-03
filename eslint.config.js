const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = [
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		languageOptions: {
			globals: {
				node: true,
				commonjs: true,
				es6: true,
				BigInt: true
			},
			parser: tseslint.parser,
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin
		},
		rules: {
			'require-atomic-updates': 'warn',
			'no-case-declarations': 'off',
			'no-empty': 'off',
			'no-console': 'off',
			'linebreak-style': 'off',
			'no-global-assign': 'off',
			'prefer-const': 'error',
			'no-var': 'error',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					'argsIgnorePattern': '^_'
				}
			],
			'no-extra-semi': 'off',
			'@typescript-eslint/no-extra-semi': 'error',
			'@typescript-eslint/no-empty-interface': 'warn',
			'@typescript-eslint/no-inferrable-types': 'off',
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/no-explicit-any': 'warn',
			'one-var': [
				'error',
				'never'
			],
			indent: [
				'error',
				'tab',
				{
					SwitchCase: 1
				}
			],
			quotes: [
				'error',
				'single'
			],
			semi: [
				'error',
				'always'
			]
		}
	}
];