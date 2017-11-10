/*global describe it expect*/
const {
  stripCommas,
  capitalizeFirstLetter,
  createUserHandle,
  getStartOfDay,
  getNextDay,
  pluralize
} = require('../helpers');

describe('test helper methods', () => {
  it('should strip comma from the number', () => {
    expect(stripCommas('1,200')).toBe('1200');
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

  it('should get the start of day', () => {
    let date = new Date('January 28, 2017');
    let expectedDate = new Date('January 28, 2017');

    expect(getStartOfDay(date)).toEqual(expectedDate);
  });

  it('should get the next day', () => {
    let date = new Date('January 28, 2017');
    let expectedDate = new Date('January 28, 2017');
    expectedDate.setHours(24);

    expect(getNextDay(date)).toEqual(expectedDate);
  });
});
