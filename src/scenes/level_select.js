import Phaser from 'phaser';
import {colors} from '../colors.js';
import {Button} from '../button.js';

class LevelSelectScene extends Phaser.Scene {

    create() {
        let levelSelect = this;

        levelSelect.add.text(450, 200, 'Level Select', {
                fontFamily: 'avenir_regular',
                fontSize: '48px',
                color: Phaser.Display.Color.IntegerToColor(colors.black).rgba
            }
        ).setOrigin(0.5);

        let backButton = new Button(levelSelect, 450, 550, 'BACK');
        backButton.on('pointerdown',
            function (pointer) {
                levelSelect.scene.start('menu');
            }
        );
        levelSelect.add.existing(backButton);
    }
}

export {LevelSelectScene};