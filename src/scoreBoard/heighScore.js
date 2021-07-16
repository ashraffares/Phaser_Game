import _ from 'lodash';
// eslint-disable-next-line import/no-cycle
import { getScores } from './api';

const hiScores = (scores) => {
  if (scores.length !== 0) {
    localStorage.setItem('scores', JSON.stringify(scores));

    let newScores = localStorage.getItem('scores');
    newScores = JSON.parse(newScores);

    if (newScores.length > 0) {
      return newScores;
    }
  }
  return false;
};

const sortedScores = () => {
  getScores();
  let newScores = localStorage.getItem('scores');
  newScores = JSON.parse(newScores);
  newScores = _.sortBy(newScores, ['score']);

  return newScores || '';
};

export { hiScores, sortedScores };