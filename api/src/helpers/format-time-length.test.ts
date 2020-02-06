/**
 * @group unit
 */

import { formatTimeLength } from './format-time-length';
describe('FormatTimeLength', () => {
  it('should return a formatted time length from a number of milliseconds', () => {
    const testNumbers = new Map([
      [-1000, '0 minutes, 1 seconds'],
      [-1, '0 minutes, 0 seconds'],
      [0, '0 minutes, 0 seconds'],
      [1, '0 minutes, 0 seconds'],
      [1000, '0 minutes, 1 seconds'],
      [10000, '0 minutes, 10 seconds'],
      [100000, '1 minutes, 40 seconds'],
      [1000000, '16 minutes, 40 seconds'],
      [10000000, '2 hours, 46 minutes, 40 seconds'],
      [100000000, '1 days, 3 hours, 46 minutes, 40 seconds'] // 100 million ms
    ]);

    testNumbers.forEach((value, key) => {
      expect(formatTimeLength(`${key}`)).toEqual(value);
    });

    const errorTests = new Map([
      ['', "Error parsing '': not a number"],
      ['abc', "Error parsing 'abc': not a number"]
    ]);

    errorTests.forEach((value, key) => {
      expect(() => {
        formatTimeLength(key);
      }).toThrow(value);
    });
  });
});
