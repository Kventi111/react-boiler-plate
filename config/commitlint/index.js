module.exports = {
    extends: ['@commitlint/config-conventional', '@commitlint/config-lerna-scopes'],
    rules: {
        'subject-case': [2, 'always', 'sentence-case'],
        'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert', 'build', 'release']],
    },
};
