// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 4, b: 2, action: Action.Subtract, expected: 2 },
    { a: 8, b: 2, action: Action.Subtract, expected: 6 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 1, b: 2, action: Action.Multiply, expected: 2 },
    { a: 2, b: 2, action: Action.Divide, expected: 1 },
    { a: 8, b: 2, action: Action.Divide, expected: 4 },
    { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
    { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
    { a: 3, b: 2, action: '123', expected: null },
    { a: 1, b: 2, action: 'action', expected: null },
    { a: "a", b: 2, action: Action.Exponentiate, expected: null },
    { a: 3, b: "b", action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)('should blah-blah', ({ a, b, action, expected }) => {
    expect(simpleCalculator({a, b, action})).toBe(expected);
  });
  // Consider to use Jest table tests API to test all cases above
});
