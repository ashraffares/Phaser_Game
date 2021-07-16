import saveHandler from '../saveHandler';

beforeAll(() => {
  localStorage.setItem('name', JSON.stringify('salley'));
});

describe('saves user name to localstorage for easy access, when making api post we can include it', () => {
  test('function accepts an agurment [String], and save into localstorage with key [name]', () => {
    expect(saveHandler('salley')).toBe(true);
  });
  test("when user name is '' or empty, should return false and not save to localstorage", () => {
    expect(saveHandler('')).toBe(true);
  });
});