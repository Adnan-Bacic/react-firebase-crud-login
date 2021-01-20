module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'arrow-body-style': ['error', 'always'],
		'implicit-arrow-linebreak': ['error', 'below'],
		'react/prop-types': ['warn'],
		'react/require-default-props': ['warn'],
		'react/self-closing-comp': ['warn'],
		'no-unused-vars': ['warn'],
		'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0 }],
		'no-trailing-spaces': ['warn', { skipBlankLines: true }],
		'indent': ['warn', 2],
		'linebreak-style': ['warn', 'windows'],
		'quotes': ['warn', 'single'],
		'semi': ['warn', 'always']
	}
};
