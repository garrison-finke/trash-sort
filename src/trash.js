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

/*
* @params 
*
* 
*/
function createCrinkleMap(scene) {
    const size = 128;

    // loads into memory
    const texture = scene.textures.createCanvas(
        'crinkle-map',
        size,
        size
    );

    const context = texture.getContext();
    const pixels = context.createImageData(size, size);

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const index = (y * size + x) * 4; // throwback to computer graphics drawing lines lowk #ebk

            // troubles with getting folds to work, i jsut asked chatGPT and pasted
            // output without gaf
            const horizontalFold = (2 / Math.PI) * Math.asin(Math.sin(x * 0.18 + y * 0.10));
            const verticalFold = (2 / Math.PI) * Math.asin(Math.sin(y * 0.21 - x * 0.08)); 

            // each inde
            pixels.data[index] = Math.round(
                128 + horizontalFold * 110);

            pixels.data[index + 1] = Math.round(
                128 + verticalFold * 110);

            pixels.data[index + 2] = 128;
            pixels.data[index + 3] = 255; // changes transparency, dont change

            context.putImageData(0,0);

        }
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

