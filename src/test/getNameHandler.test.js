import getNameHandler from '../localStorage/getNameHandler';

beforeAll(() => {
  localStorage.setItem('name', JSON.stringify('salley'));
});

describe('gets name from local storage, when user finish player we can post results with it', () => {
  test('get saved name from local storage with key name', () => {
    const name = getNameHandler();
    expect(name).toBe('salley');
  });
});
