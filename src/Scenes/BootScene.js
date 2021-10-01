import Phaser from 'phaser';
import intro2bg from '../assets/intro2bg.jpg';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', intro2bg);
  }

  create() {
    this.scene.start('Preloader');
  }
}