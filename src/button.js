import Phaser from 'phaser';
import {preloadFonts} from './preloading.js';
import {colors} from './colors.js'

class Button extends Phaser.GameObjects.Container {
    constructor(
        scene,
        x,
        y,
        label,
        pointeroutFont = 'avenir_regular',
        pointeroutColor = colors.white,
        pointeroverFont = 'avenir_demi',
        pointeroverColor = colors.mediumPurple50,
        fontSize = '48px',
        fontColor = colors.black,
        borderColor = colors.darkPurple,
        borderThickness = 4,
        fillColor = colors.white,
        horizontalPadding = 20,
        verticalPadding = 10
    ) {
        super(scene);

        let text = scene.add.text(0, 0, label, {
            fontFamily: pointeroutFont,
            fontSize: fontSize,
            color: Phaser.Display.Color.IntegerToColor(fontColor).rgba,
        }).setOrigin(0.5);

        let box = scene.add.rectangle(0, 0, text.width + horizontalPadding, text.height + verticalPadding, fillColor, 1).setStrokeStyle(borderThickness, borderColor);

        this.setX(x);
        this.setY(y);
        this.add(box);
        this.add(text);

        this.setInteractive(new Phaser.Geom.Rectangle(-1 * box.width / 2, -1 * box.height / 2, box.width, box.height), Phaser.Geom.Rectangle.Contains);

        this.on('pointerover', 
            function (pointer) {
                box.setFillStyle(pointeroverColor);
                text.setFontFamily(pointeroverFont);
            }
        );

        this.on('pointerout', 
            function (pointer) {
                box.setFillStyle(pointeroutColor);
                text.setFontFamily(pointeroutFont);
            }
        );
    }

}

export {Button};