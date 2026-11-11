import Phaser from 'phaser';

class Trash extends Phaser.GameObjects.Image {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setInteractive();
        scene.input.setDraggable(this);

        this.on('dragstart', 
            function (pointer) {
                this.body.setAllowGravity(false);
                this.body.setVelocity(0, 0);
            }
        );

        this.on('drag', 
            function (pointer, dragX, dragY) {
                this.x = dragX;
                this.y = dragY;
            }
        );
    }

    spawn(keys, x, y) {
        let index = Math.floor(Math.random() * keys.length); // what if Math.random() gives 1.0
        this.setTexture(keys[index]);
        this.setX(x);
        this.setY(y);
        this.setScale(0.5);
        this.body.setVelocity(0, 0);
    }
}

export {Trash};

/*
let availableKeys;

if (levelItems[selectedLevel] !== undefined && levelItems[selectedLevel] !== null) {
    availableKeys = levelItems[selectedLevel];
}
else {
    availableKeys = keys;
}

if (availableKeys.length === 0) {
    console.error('No trash items configured for ' + selectedLevel);
    return;
}

let index = Math.floor(Math.random() * availableKeys.length);
let selectedItem = availableKeys[index];
*/  