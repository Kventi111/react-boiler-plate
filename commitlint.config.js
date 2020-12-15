module.exports = {
  extends: ['@commitlint/config-angular'],
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['EL-', 'RL-', 'VBS-', 'SME-', 'PR-', 'ACQ-']
    }
  },
  rules: {
    'header-max-length': [0, 'always', 110],
    'subject-max-length': [0, 'always', 72],
    'references-empty': [2, 'never']
  }
};
