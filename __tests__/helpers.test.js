const {
  stripCommas,
  capitalizeFirstLetter,
  createUserHandle,
  pluralize
} = require('../helpers');

describe('test helper methods', () => {
  it('should strip comma from the number', () => {
    expect(stripCommas('1,200')).toBe('1200.00');
  });

  it('should capitalize first letter', () => {
    expect(capitalizeFirstLetter('hello world')).toBe('Hello world');
  });

  it('should create a user handle', () => {
    expect(createUserHandle('AU123HX', 'test')).toBe('<@AU123HX|test>');
  });

  it('should pluralize the string', () => {
    expect(pluralize(2, 'test')).toBe('tests');
  });
});
