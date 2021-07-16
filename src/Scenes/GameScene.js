/* eslint-disable no-unused-expressions */
import Phaser from 'phaser';
import laser from '../assets/laser.png';
import ship from '../assets/ship.png';
import LaserGroup from './LaserGroup';
import enamy from '../assets/enamyEggS.png';
import collectStars from '../assets/star.png';
import explodAnimation from '../assets/sprExplosion.png';
import enamy1 from '../assets/enamyEggF.png';
import laserSound from '../assets/sndLaser.wav';
import explode from '../assets/sndExplode0.wav';
import collectStarS from '../assets/collectStarS.wav';

let score = 5;
let eggSpeed = 10;
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('enamy', enamy);
    this.load.image('enamy1', enamy1);
    this.load.image('laser', laser);
    this.load.image('ship', ship);
    this.load.spritesheet('stars', collectStars, {
      frameWidth: 60,
      frameHeight: 60,
    });
    this.load.spritesheet('explodAnimation', explodAnimation, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio('laserSound', [laserSound]);
    this.load.audio('explode', explode);
    this.load.audio('collectStarS', collectStarS);
  }

  create() {
    this.enamy1 = this.physics.add.image(350, 0, 'enamy1');
    this.enamy1.setCollideWorldBounds(true);
    this.enamy1.setBounce(1, 1);

    setInterval(() => {
      this.shootLaserEnamy(this.enamy1.x, this.enamy1.y);
    }, 1000);

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
    this.laserGroup = new LaserGroup(this);

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

    this.enamy = this.physics.add.group({
      key: 'enamy',
      repeat: 20,
      setXY: {
        x: 20, y: 0, stepX: 35,
      },
    });

    this.enamy.children.iterate((child) => {
      child.setVelocityY(eggSpeed);
      child.body.collideWorldBounds = true;
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 1));
    });

    this.stars = this.physics.add.group({
      key: 'stars',
      repeat: 11,
      setXY: {
        x: 12, y: 5, stepX: 70, stepY: 20,
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
      this.addMoreStars();
      score += 5;
      this.resetScore();
    });

    this.physics.add.collider(this.mainShip, this.enamy, (mainship, enamy) => {
      this.PlayExplodeAnim(enamy);
      enamy.disableBody(true, true);
      score -= 25;
      this.resetScore();
    });

    this.physics.add.collider(this.laserGroup, this.enamy, (laserGroup, enamy) => {
      enamy.disableBody(true, true);
      this.PlayExplodeAnim(enamy);
      score += 5;
      this.resetScore();
    });

    this.physics.add.collider(this.enamy1, this.mainShip, () => {
      score -= 5;
      this.resetScore();
    });
  }

  update() {
    this.addMoreEggs();
    this.followShip();
    if (score <= 0) {
      this.physics.pause();
      this.mainShip.disableBody(true, true);
      this.gameOver = true;
      this.scene.start('GameOver');
    }
  }

  followShip() {
    // eslint-disable-next-line max-len
    this.rotation = Phaser.Math.Angle.Between(this.enamy1.x, this.enamy1.y, this.mainShip.x, this.mainShip.y);
    this.enamy1.body.setVelocity(
      Math.cos(this.rotation) * 50,
      Math.sin(this.rotation) * 50,
    );
  }

  shootLaser() {
    this.laserGroup.fireLaser(this.mainShip.x, this.mainShip.y - 20, this.laserS, 'mainShip');
  }

  shootLaserEnamy(x, y) {
    this.laserGroup.fireLaser(x, y - 20, this.laserS, 'enamy');
  }

  PlayExplodeAnim(enamy) {
    this.explode.play();
    this.expAnim.x = enamy.x;
    this.expAnim.y = enamy.y;
    this.expAnim.play('expAnim');
  }

  addMoreEggs() {
    if (this.enamy.countActive(true) === 0) {
      this.enamy.children.iterate(child => {
        child.enableBody(true, child.x, 0, true, true);
        eggSpeed += 3;
        child.setVelocityY(eggSpeed);
      });
    }
  }

  addMoreStars() {
    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(child => {
        child.enableBody(true, child.x, 0, true, true);
        child.setVelocityY(900);
      });
    }
  }

  resetScore() {
    this.scoreText.setText('Score: '.concat(score));
  }
}