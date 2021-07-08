/* eslint-disable no-unused-expressions */
import Phaser from 'phaser';
import laser from '../assets/laser.png';
import ship from '../assets/ship.png';
import LaserGroup from './LaserGroup';
import enamy from '../assets/enamy.png';
import collectStars from '../assets/star.png';

let score = 0;
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('enamy', enamy);
    this.load.image('laser', laser);
    this.load.image('ship', ship);
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
    this.mainShip = this.physics.add.image(centerX, centerY, 'ship');

    this.input.on('pointermove', pointer => {
      this.mainShip.y = pointer.y;
      this.mainShip.x = pointer.x;
      this.mainShip.setVelocityY(0);
    });
    this.input.on('pointerdown', () => {
      this.shootLaser();
    });

    this.physics.add.collider(this.laserGroup, this.stars, (laserGroup, stars) => {
      stars.disableBody(true, true);
    });
    this.physics.add.collider(this.mainShip, this.stars, (mainShip, stars) => {
      stars.disableBody(true, true);
      score += 10;
      this.scoreText.setText('Score: '.concat(score));
    });

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
  }

  shootLaser() {
    this.laserGroup.fireLaser(this.mainShip.x, this.mainShip.y - 20);
  }
}