module.exports = {
    extends: 'react-app',
    rules: {
        'indent': ['error', 2],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'react/jsx-key': 'warn',
        'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
        'no-console': 'warn',
        'linebreak-style': ['error', 'unix'],
        'react/prop-types': 'off', // Change this to 'warn'/'error' if using PropTypes
    },
};
