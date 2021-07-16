import Phaser from 'phaser';

export default class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'laser');
  }

  fire(x, y, laserS, shipKind) {
    laserS.play();
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    if (shipKind === 'enamy') {
      this.setVelocityY(900);
    } else {
      this.setVelocityY(-900);
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.y <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}