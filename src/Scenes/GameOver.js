import Phaser from 'phaser';
import config from '../Config/config';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    setTimeout(() => {
      this.scene.start('Title');
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }, 3000);
    this.madeByText = this.add.text(config.width / 2, config.height / 2, 'Game Over', { fontSize: '26px', color: '#fff' });
  }
}