/* eslint-disable no-unused-expressions */
import Phaser from 'phaser';
import laser from '../assets/laser.png';
import ship from '../assets/ship.png';
import LaserGroup from './LaserGroup';
import enamy from '../assets/enamy.png';
import collectStars from '../assets/star.png';
import explodAnimation from '../assets/sprExplosion.png';
import laserSound from '../assets/sndLaser.wav';
import explode from '../assets/sndExplode0.wav';
import collectStarS from '../assets/collectStarS.wav';

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
    this.load.spritesheet('explodAnimation', explodAnimation, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio('laserSound', [laserSound]);
    this.load.audio('explode', explode);
    this.load.audio('collectStarS', collectStarS);
  }

  create() {
    this.laserS = this.sound.add('laserSound');
    this.explode = this.sound.add('explode');
    this.collectStarSound = this.sound.add('collectStarS');

    this.expAnim = this.add.sprite(0, 0, 'explodAnimation');
    this.anims.create({
      key: 'expAnim',
      frames: this.anims.generateFrameNumbers('explodAnimation'),
      frameRate: 20,
      repeat: 0,
    });

    this.laserGroup = new LaserGroup(this);

    this.enamy = this.physics.add.group({
      key: 'enamy',
      repeat: 11,
      setXY: {
        x: 20, y: 0, stepX: 68,
      },
    });

    this.enamy.children.iterate((child) => {
      child.setVelocityY(50);
    });

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

    this.physics.add.collider(this.mainShip, this.stars, (mainShip, stars) => {
      stars.disableBody(true, true);
      this.collectStarSound.play();
      score += 5;
      this.scoreText.setText('Score: '.concat(score));
      if (this.stars.countActive(true) === 0) {
        this.stars.children.iterate(child => {
          child.enableBody(true, child.x, 0, true, true);
          child.setVelocityY(300);
        });
      }
    });

    this.physics.add.collider(this.mainShip, this.enamy, (mainship, enamy) => {
      this.explode.play();
      enamy.disableBody(true, true);
      this.expAnim.x = enamy.x;
      this.expAnim.y = enamy.y;
      this.expAnim.play('expAnim');
      score -= 10;
    });

    this.physics.add.collider(this.laserGroup, this.enamy, (laserGroup, enamy) => {
      enamy.disableBody(true, true);
      this.explode.play();
      this.expAnim.x = enamy.x;
      this.expAnim.y = enamy.y;
      this.expAnim.play('expAnim');
      score += 20;
    });

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
  }

  shootLaser() {
    this.laserGroup.fireLaser(this.mainShip.x, this.mainShip.y - 20, this.laserS);
  }
}