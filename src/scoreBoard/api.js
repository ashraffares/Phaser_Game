import _ from 'lodash';

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

const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/fELVs0GVO25geawXGIjZ/scores';
const getScores = () => {
  let data;
  try {
    data = fetch(api)
      .then((res) => res.json())
      .then((dat) => hiScores(dat.result));
  } catch (error) {
    return error;
  }

  return data;
};

const postScores = (score, playerName) => {
  if (score < 1) {
    return false;
  }
  try {
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: playerName,
        score,
      }),
    }).then((res) => res);
    return true;
  } catch (error) {
    return error;
  }
};

const sortedScores = () => {
  getScores();
  let newScores = localStorage.getItem('scores');
  newScores = JSON.parse(newScores);
  newScores = _.sortBy(newScores, ['score']);

  return newScores || '';
};

export {
  getScores, postScores, hiScores, sortedScores,
};