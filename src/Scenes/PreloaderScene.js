import 'phaser';
import zenvalogo from '../assets/logo.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.load.image('logo', zenvalogo);
  }

  create() {
    this.senene.start('Preloader');
  }
}