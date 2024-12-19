import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['src/**/*.ts'],
        ignores: ['src/**/*.test.ts'],
		rules: {
			"class-methods-use-this": "off",
			"@typescript-eslint/class-methods-use-this": "error",
			"@typescript-eslint/explicit-member-accessibility": "error",
			"@typescript-eslint/no-unsafe-call": "error",
			"unicorn/filename-case": [
				"error",
				{
					"case": "pascalCase"
				}
			],
			"import/no-named-export": "error",
			"import/no-unused-modules": "error",
			"import/default": "error",
		},
    },
    { languageOptions: { globals: globals.browser } },

	{ 
		plugins: {
			unicorn: eslintPluginUnicorn,
			"import": importPlugin,
		}
	},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
]
