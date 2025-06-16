import sum from './sum';
import {describe, expect, test} from '@jest/globals';

describe('sum module', () => {
  test('adds 1 + 3 to equal 4', () => {
    expect(sum(1, 3)).toBe(4);
  });
});