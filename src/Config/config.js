import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT,
  parent: 'Shooter Game',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  dom: {
    createContainer: true,
  },
  pixelArt: true,
  roundPixels: true,
};