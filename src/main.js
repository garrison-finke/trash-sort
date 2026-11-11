import Phaser from 'phaser';
import {MenuScene} from './scenes/menu.js';
import {GameScene} from './scenes/game.js';
import {GameOverScene} from './scenes/game_over.js';
import {LevelSelectScene} from './scenes/level_select.js';
import {GalleryScene} from './scenes/gallery.js';

new Phaser.Game({
    type: Phaser.AUTO,
    width: 900,
    height: 900,
    backgroundColor: 'rgb(200, 200, 200)',
    scene: [
        new MenuScene('menu'), 
        new GameScene('game'), 
        new GameOverScene('game_over'), 
        new LevelSelectScene('level_select'),
        new GalleryScene('gallery')
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 100},
            debug: false
        }
    },
});