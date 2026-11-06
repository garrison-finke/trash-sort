import Phaser from 'phaser';
import {MenuScene} from './scenes/menu.js';
import {GameScene} from './scenes/game.js';

new Phaser.Game({
    type: Phaser.AUTO,
    width: 900,
    height: 900,
    backgroundColor: 'rgb(200, 200, 200)',
    scene: [new MenuScene('main'), new GameScene('game')],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 100},
            debug: false
        }
    },
});