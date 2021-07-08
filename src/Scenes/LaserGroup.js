import Phaser from 'phaser';
import Laser from './Laser';

export default class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Laser,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: 'laser',
    });
  }

  fireLaser(x, y, laserS) {
    const laser = this.getFirstDead(false);
    if (laser) {
      laser.fire(x, y, laserS);
    }
  }
}