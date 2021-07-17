import Phaser from 'phaser';
import config from '../Config/config';
import saveHandler from '../localStorage/saveHandler';
import btn1 from '../assets/ui/blue_button02.png';

export default class userInputs extends Phaser.Scene {
  constructor() {
    super('userInputs');
  }

  preload() {
    this.load.image('btn1', btn1);
  }

  create() {
    const formHml = `
    <div class="form-group" style="display: flex; flex-direction:column;">
    <label style="color: white;" for="name">Enter you nickName </label>
    <input style="padding: 5px;" type="text" name="name" id="name" />
  </div>
  `;
    this.form = this.add
      .dom(config.width * 0.5, config.height * 0.35)
      .createFromHTML(formHml);
    this.form.setPerspective(800);
    this.start = this.add.image(config.width * 0.5, config.height * 0.5, 'btn1');
    this.text = this.add.text(360, 275, 'Play', { fontSize: '32px', fill: '#fff' });
    this.start.displayWidth = 100;
    this.start.displayHeight = 80;

    this.start.setInteractive();

    this.start.on('pointerdown', () => {
      const name = this.form.getChildByName('name').value;
      if (name !== '') {
        saveHandler(name);
        this.scene.start('Game');
      }
    });
  }
}
