import { hiScores, sortedScores } from '../scoreBoard/heighScore';

beforeAll(() => {
  localStorage.setItem(
    'scores',
    JSON.stringify([
      { user: 'user1', score: 20 },
      { user: 'user2', score: 10 },
      { user: 'user3', score: 40 },
    ]),
  );
});

describe('two functions to handle getting scores and sorting in decending order', () => {
  test('function to to store data fetched from api into localstorage', () => {
    const testData = [
      { user: 'user1', score: 20 },
      { user: 'user2', score: 10 },
      { user: 'user3', score: 40 },
    ];
    const rawData = [
      { user: 'user1', score: 20 },
      { user: 'user2', score: 10 },
      { user: 'user3', score: 40 },
    ];
    const res = hiScores(rawData);
    expect(res).toEqual(testData);
  });

  test('return a new and sorted todos from local storage', () => {
    const sortedData = [
      { score: 10, user: 'user2' },
      { score: 20, user: 'user1' },
      { score: 40, user: 'user3' },
    ];
    const data = sortedScores();
    expect(data).toEqual(sortedData);
  });
});
