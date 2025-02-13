const standardVersionTypes = require('./.versionrc.json').types;

const typeEnums = standardVersionTypes.map((t) => t.type);

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', typeEnums],
    'body-max-line-length': [2, 'always', 1000],
  },
};
