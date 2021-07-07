/* eslint-disable no-unused-expressions */
import Phaser from 'phaser';
import laser from '../assets/laser.png';
import ship from '../assets/ship.png';
import LaserGroup from './LaserGroup';
import enamy from '../assets/enamy.png';
import collectStars from '../assets/bomb.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('enamy', enamy);
    this.load.image('laser', laser);
    this.load.spritesheet('ship', ship, { frameWidth: 125, frameHeight: 75 });
    this.load.image('stars', collectStars);
  }

  create() {
    this.laserGroup = new LaserGroup(this);

    this.stars = this.physics.add.group({
      key: 'stars',
      repeat: 11,
      setXY: {
        x: 12, y: 0, stepX: 70, stepY: 5,
      },
    });

    this.stars.children.iterate((child) => {
      child.setVelocityY(900);
      child.body.collideWorldBounds = true;
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 1));
    });

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height - 90;
    this.mainShip = this.physics.add.sprite(centerX, centerY, 'ship');

    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.on('pointermove', pointer => {
      this.mainShip.x = pointer.x;
      this.mainShip.y = pointer.y;
    });
    this.input.on('pointerdown', () => {
      this.shootLaser();
    });

    this.physics.add.collider(this.laserGroup, this.stars);
  }

  shootLaser() {
    this.laserGroup.fireLaser(this.mainShip.x, this.mainShip.y - 20);
  }
}