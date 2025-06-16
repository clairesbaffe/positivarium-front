import sum from './sum';
import {describe, expect, test} from '@jest/globals';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe('sum module, failing', () => {
  test('adds 1 + 4 to equal 3', () => {
    expect(sum(1, 4)).toBe(3);
  });
});