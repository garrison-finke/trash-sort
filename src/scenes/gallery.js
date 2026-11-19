import Phaser from 'phaser';
import { colors } from '../colors.js'
import { Button } from '../button.js';
import { preloadTrash } from '../preloading.js';
import { trashInfo } from '../trashInfo.js';


class GalleryScene extends Phaser.Scene {

    constructor(key) {
        super(key);
        this.keys = [];
    }

    preload() {
        this.keys = preloadTrash(this);
    }

    create() {
        let gallery = this;
        //console.log('Gallery trash images:', gallery.keys);


        // Outline that moves to the selected item.
        gallery.selectionOutline = gallery.add.rectangle(
            0, 0, 90, 90
        );
        gallery.selectionOutline.setStrokeStyle(3, colors.black);
        gallery.selectionOutline.setVisible(false);

        // Background for the description area.
        gallery.add.rectangle(
            450, 690, 800, 200, 0xffffff, 0.65
        ).setStrokeStyle(2, colors.black);

        // Selected item's name.
        gallery.itemNameText = gallery.add.text(
            80, 610, 'Select an item', {
            fontFamily: 'avenir_regular',
            fontSize: '28px',
            color: Phaser.Display.Color.IntegerToColor(colors.black).rgba
        }
        );

        // Selected item's description.
        gallery.itemDescriptionText = gallery.add.text(
            80, 655, 'Click an item to learn how to sort it.', {
            fontFamily: 'avenir_regular',
            fontSize: '22px',
            color: Phaser.Display.Color.IntegerToColor(colors.black).rgba,
            wordWrap: {
                width: 740
            }
        }
        );

        gallery.add.text(450, 80, 'TRASH GALLERY', {
            fontFamily: 'avenir_regular',
            fontSize: '48px',
            color: Phaser.Display.Color.IntegerToColor(colors.black).rgba
        }
        ).setOrigin(0.5);

        let trashButton = new Button(gallery, 100, 170, 'Trash');
        trashButton.on('pointerdown',
            function (pointer) {
                gallery.showItems('trash');
            }
        );
        gallery.add.existing(trashButton);

        let recyclingButton = new Button(gallery, 310, 170, 'Recycling');
        recyclingButton.on('pointerdown',
            function (pointer) {
                gallery.showItems('recycling');
            }
        );
        gallery.add.existing(recyclingButton);

        let organicsButton = new Button(gallery, 545, 170, 'Organics');
        organicsButton.on('pointerdown',
            function (pointer) {
                gallery.showItems('organics');
            }
        );
        gallery.add.existing(organicsButton);

        let specialtyButton = new Button(gallery, 775, 170, 'Specialty');
        specialtyButton.on('pointerdown',
            function (pointer) {
                gallery.showItems('specialty');
            }
        );
        gallery.add.existing(specialtyButton);

        let backButton = new Button(gallery, 450, 840, 'BACK');
        backButton.on('pointerdown',
            function (pointer) {
                gallery.scene.start('menu');
            }
        );
        gallery.add.existing(backButton);
    }

    showItems(category) {
        let gallery = this;

        // Reset the previous selection when switching categories.
        gallery.selectionOutline.setVisible(false);
        gallery.itemNameText.setText('Select an item');
        gallery.itemDescriptionText.setText(
            'Click an item to learn how to sort it.'
        );

        // Destroy the images from the previous category.
        if (gallery.itemImages) {
            gallery.itemImages.clear(true, true);
        }

        gallery.itemImages = gallery.add.group();

        // Find the image keys belonging to this category.
        let items = gallery.keys.filter(function (key) {
            return key.startsWith(category + '-');
        });

        // Display up to five items per row.
        for (let i = 0; i < items.length; i++) {
            let column = i % 5;
            let row = Math.floor(i / 5);

            let x = 150 + column * 150;
            let y = 270 + row * 100;

            let image = gallery.add.image(x, y, items[i]);

            // Fit inside a 75 × 75 area without stretching the image.
            let scale = Math.min(
                75 / image.width,
                75 / image.height
            );

            image.setScale(scale);
            image.setInteractive({ useHandCursor: true });

            image.on('pointerdown', function (pointer) {
                gallery.showDescription(image.texture.key);

                // Move the outline to the selected image.
                gallery.selectionOutline.setPosition(image.x, image.y);
                gallery.selectionOutline.setVisible(true);
            });

            gallery.itemImages.add(image);
        }
    }

    showDescription(key) {
        let gallery = this;

        let info = trashInfo[key];


        gallery.itemNameText.setText(info.name);

        gallery.itemDescriptionText.setText(info.description);
    }
}

export { GalleryScene };