import Phaser from 'phaser';
import { getScores } from '../scoreBoard/api';
import { sortedScores } from '../scoreBoard/heighScore';
import btn1 from '../assets/ui/blue_button02.png';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    this.score = getScores();
    this.load.image('btn1', btn1);
  }

  create() {
    setTimeout(() => {
      this.scene.start('Title');
      window.location.reload();
    }, 20000);
    this.add.text(
      this.game.config.width * 0.4,
      this.game.config.height * 0.04,
      'High Scores',
      {
        fontFamily: 'monospace',
        fontSize: 38,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      },
    );
    const hiScores = sortedScores();

    for (let i = 0; i < 5; i += 1) {
      this.add.text(
        this.game.config.width * 0.45,
        this.game.config.height * 0.1 + 20 * i,
        `${hiScores[hiScores.length - (i + 1)].user} ${
          hiScores[hiScores.length - (i + 1)].score
        }`,
        {
          fontFamily: 'monospace',
          fontSize: 18,
          fontStyle: 'bold',
          color: '#ffffff',
          align: 'center',
        },
      );
    }

    this.title = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.3,
      'GAME OVER',
      {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      },
    );
    this.title.setOrigin(0.5);

    this.restartBtn = this.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'btn1',
    );
    this.textRestart = this.add.text(370, 280, 'Restart', { fontSize: '32px', fill: '#fff' });
    this.restartBtn.setInteractive();

    this.restartBtn.on('pointerdown', () => {
      this.scene.start('SceneMain');
      window.location.reload();
    });
  }
}