import Phaser from 'phaser';
import {colors} from '../colors.js';
import {Button} from '../button.js';
import {levelDetails} from '../levels.js';

class LevelSelectScene extends Phaser.Scene {

    create() {
        let levelSelect = this;

        levelSelect.add.text(450, 150, 'Level Select', {
                fontFamily: 'avenir_regular',
                fontSize: '48px',
                color: Phaser.Display.Color.IntegerToColor(colors.black).rgba
            }
        ).setOrigin(0.5);

        let buttonY = 290; // first level button position

        // Object.entries gives each level key and its settings
        for (let [levelKey, details] of Object.entries(levelDetails)) {
            let levelButton = new Button(
                levelSelect,
                450,
                buttonY,
                details.label,

                // Keep Button default hover settings.
                undefined,
                undefined,
                undefined,
                undefined,

                // Use smaller text so the building names fit.
                '28px'
            );       

            levelButton.on('pointerdown', function () {
                // The registry stores data that other scenes can access.
                // Remember this choice for starting and replaying the game.
                levelSelect.registry.set('selectedLevel', levelKey);

                levelSelect.scene.start('game');
            });

            levelSelect.add.existing(levelButton);

            buttonY += 95;
        }

        let backButton = new Button(levelSelect, 450, 750, 'BACK');

        backButton.on('pointerdown', function () {
                levelSelect.scene.start('menu');
            });
        levelSelect.add.existing(backButton);
    }
}

export {LevelSelectScene};