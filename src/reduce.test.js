const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce;
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  })

  // Add tests here
});
