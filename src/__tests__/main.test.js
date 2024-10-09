//util
import { stripTypenames } from '../components/form/utils/stripTypenames';

describe('#stripTypenames', () => {
  test('when input is an object with "length" property present in it', () => {
    const expected = {
      name: 'Jon Doe',
      length: 10000000,
    };

    const input = {
      ...expected,
      __typename: 'user',
    };

    const startTime = performance.now();
    const output = stripTypenames(input);
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    if (timeTaken > 1000) {
      throw new Error(
        `Test failed: task took too long (${timeTaken.toFixed(2)} ms)`
      );
    }

    expect(output).toEqual(expected);
  });
});
