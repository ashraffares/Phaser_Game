import Phaser from 'phaser';
import zenvalogo from '../assets/logo.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', zenvalogo);
  }

  create() {
    this.scene.start('Preloader');
  }
}