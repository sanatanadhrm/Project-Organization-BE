module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: ['**/test/**/*.test.js'],
  maxWorkers: 2, // Ubah sesuai kebutuhan
};
