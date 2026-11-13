import Phaser from 'phaser';
import {preloadFonts} from '../preloading.js';
import {colors} from '../colors.js';
import {Button} from '../button.js';

class MenuScene extends Phaser.Scene {

    preload() {
        preloadFonts(this);
        this.load.image('logo', import.meta.env.BASE_URL + 'assets/logo.png');
    }
    
    create() {
        let menu = this;
        document.body.style.backgroundColor = '#dbbde8'; // not needed when we add images for the level abckgrounds, currently using colors.
        document.body.style.backgroundImage = 'none'; 

        /*
        menu.add.text(450, 300, 'Welcome to TRASH SORT', {
            fontFamily: 'avenir_regular',
            fontSize: '48px',
            color: Phaser.Display.Color.IntegerToColor(colors.black).rgba,
            align: 'center'
        }).setOrigin(0.5);  
        */
        const logo = menu.add.image(450, 300, 'logo');
        const logoscale = Math.min(600 / logo.width, 220 / logo.height);
        logo.setScale(logoscale);

        let startButton = new Button(menu, 450, 450, 'START');
        startButton.on('pointerdown',
            function (pointer) {
                menu.scene.start('game');
            }
        );
        menu.add.existing(startButton);

        let levelSelectButton = new Button(menu, 450, 550, 'LEVEL SELECT');
        levelSelectButton.on('pointerdown',
            function (pointer) {
                menu.scene.start('level_select');
            }
        );
        menu.add.existing(levelSelectButton);

        let trashGalleryButton = new Button(menu, 450, 650, 'TRASH GALLERY');
        trashGalleryButton.on('pointerdown', 
            function (pointer) {
                menu.scene.start('gallery');
            }
        );
        menu.add.existing(trashGalleryButton);
        
    }   
}

export {MenuScene};