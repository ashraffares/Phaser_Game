/* eslint-disable no-unused-expressions */
import Phaser from 'phaser';
import laser from '../assets/laser.png';
import ship from '../assets/ship.png';
import LaserGroup from './LaserGroup';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.ship;
    this.laserGroup;
  }

  preload() {
    this.load.image('laser', laser);
    this.load.image('ship', ship);
  }

  create() {
    this.laserGroup = new LaserGroup(this);
    this.addShip();
    this.addEvent();
  }

  addEvent() {
    this.input.on('pointermove', pointer => {
      this.ship.x = pointer.x;
    });
    this.input.on('pointerdown', () => {
      this.shootLaser();
    });
  }

  shootLaser() {
    this.laserGroup.fireLaser(this.ship.x, this.ship.y - 20);
  }

  addShip() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height - 90;
    this.ship = this.add.image(centerX, centerY, 'ship');
  }
}