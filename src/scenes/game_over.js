import Phaser from 'phaser';
import { preloadFonts } from '../preloading.js';
import {Button} from '../button.js';

class GameOverScene extends Phaser.Scene {

    preload() {
        preloadFonts(this);
    }

    create() {
        let gameOver = this;

        this.add.text(450, 200, 'Game Over!', {
                fontFamily: 'avenir_regular',
                fontSize: '64px',
                color: '#000000'
            }).setOrigin(0.5);
        
        let playAgainButton = new Button(gameOver, 450, 450, 'PLAY AGAIN');
        playAgainButton.on('pointerdown',
            function (pointer) {
                gameOver.scene.start('game');
            }
        );
        gameOver.add.existing(playAgainButton);

        let quitButton = new Button(gameOver, 450, 550, 'QUIT');
        quitButton.on('pointerdown',
            function (pointer) {
                gameOver.scene.start('menu');
            }
        );
        gameOver.add.existing(quitButton);
    }
}

export {GameOverScene};