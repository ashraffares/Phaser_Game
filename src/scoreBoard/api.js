// eslint-disable-next-line import/no-cycle
import { hiScores } from './heighScore';

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

export { getScores, postScores };