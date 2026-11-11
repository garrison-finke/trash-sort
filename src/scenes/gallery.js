import Phaser from 'phaser';
import {colors} from '../colors.js'
import {Button} from '../button.js';


class GalleryScene extends Phaser.Scene {

    create() {
        let gallery = this;

        gallery.add.text(450, 200, 'TRASH GALLERY', {
                fontFamily: 'avenir_regular',
                fontSize: '48px',
                color: Phaser.Display.Color.IntegerToColor(colors.black).rgba
            }
        ).setOrigin(0.5);

        let trashButton = new Button(gallery, 100, 300, 'Trash');
        trashButton.on('pointerdown',
            function (pointer) {

            }
        );
        gallery.add.existing(trashButton);

        let recyclingButton = new Button(gallery, 333, 300, 'Recycling');
        recyclingButton.on('pointerdown',
            function (pointer) {
                
            }
        );
        gallery.add.existing(recyclingButton); 

        let organicsButton = new Button(gallery, 567, 300, 'Organics');
        organicsButton.on('pointerdown',
            function (pointer) {
                
            }
        );
        gallery.add.existing(organicsButton);

        let specialtyButton = new Button(gallery, 800, 300, 'Specialty');
        specialtyButton.on('pointerdown',
            function (pointer) {
                
            }
        );
        gallery.add.existing(specialtyButton);

        let backButton = new Button(gallery, 450, 700, 'BACK');
        backButton.on('pointerdown',
            function (pointer) {
                gallery.scene.start('menu');
            }
        );
        gallery.add.existing(backButton);
    }
}

export {GalleryScene};