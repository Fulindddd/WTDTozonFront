module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    'import/no-unresolved': [
      2,
      {
        ignore: ['^@/'], // @ 是设置的路径别名
      },
    ],
    'import/extensions': [
      'error',
      'never',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    endOfLine: 'auto', // 解决Delete `␍`eslintprettier/prettier问题
  },
  root: true,
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
