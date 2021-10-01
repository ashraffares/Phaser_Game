import { getScores } from '../scoreBoard/api';

describe('functions to handle getting top scores from api and saving to local storage', () => {
  test('fetch scores from api ', () => {
    const scores = getScores();
    expect(scores).not.toBeFalsy();
  });
});