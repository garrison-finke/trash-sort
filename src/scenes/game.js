import Phaser from 'phaser';
import {preloadTrash, preloadBins} from '../preloading.js';
import {colors} from '../colors.js'
import {Trash} from '../trash.js';
import {levelItems, levelDetails} from '../levels.js';

class GameScene extends Phaser.Scene {

    constructor(key) {
        super(key);
        this.keys = [];
        this.scoreText;
        this.livesText;
        this.recyclingBin;
        this.organicsBin;
        this.specialtyBin;
        this.trashBin;
    }

    init() {
        this.score = 0;
        this.lives = 3;
        this.roundEnded = false;

        //Retrieve the level chosen in the level selection scene.
        const savedLevel = this.registry.get('selectedLevel');     
        
        if (Object.prototype.hasOwnProperty.call(levelItems, savedLevel)) {
            this.selectedLevel = savedLevel;
        } else {
            this.selectedLevel = 'regular';
        }
        

        // Store choice so Play Again can reuse it.
        this.registry.set('selectedLevel', this.selectedLevel);
        const details = levelDetails[this.selectedLevel];

        // takes care of the background behind the play area
        document.body.style.backgroundColor = details.backgroundColor;

        if (details.image) {
            const imageUrl = import.meta.env.BASE_URL + details.image;
            document.body.style.backgroundImage = 'url("' + imageUrl + '")';
        } else {
            document.body.style.backgroundImage = 'none';
    }
}

    preload() {
        this.keys = preloadTrash(this);
        preloadBins(this);

        // this looks so bad rn :sob: but keeping it for later. 
        //this.load.image('paper-background', import.meta.env.BASE_URL + 'backgrounds/paper.jpg');

    }

    create() {
        
        let game = this;

        /*
        const paperBackground = game.add.image(0, 0, 'paper-background')
        paperBackground.setOrigin(0, 0);
        paperBackground.setDisplaySize(game.scale.width, game.scale.height);
        paperBackground.setDepth(-100);
        */
       
        const configuredItems = levelItems[game.selectedLevel];

        game.availableKeys = game.keys.filter(function (key) {
        let belongsToLevel = false;

        if (configuredItems === null) {
            belongsToLevel = true;
        } else {
            belongsToLevel = configuredItems.includes(key);
        }

        return belongsToLevel && game.textures.exists(key);
    });

        let recyclingBin = new Phaser.GameObjects.Image(this, 100, 750, 'recycling-bin');
        let organicsBin = new Phaser.GameObjects.Image(this, 333, 750, 'organics-bin');
        let specialtyBin = new Phaser.GameObjects.Image(this, 567, 750, 'specialty-bin');
        let trashBin = new Phaser.GameObjects.Image(this, 800, 750, 'trash-bin')

        recyclingBin.setScale(0.33);
        organicsBin.setScale(0.25);
        specialtyBin.setScale(0.40);
        trashBin.setScale(0.25);

        this.add.existing(recyclingBin);
        this.add.existing(organicsBin);
        this.add.existing(specialtyBin);
        this.add.existing(trashBin);

        this.scoreText = this.add.text(100, 100, 'Score: ' + this.score, {
            fontFamily: 'avenir_regular',
            fontSize: '24px',
            color: Phaser.Display.Color.IntegerToColor(colors.black).rgba,   
        }).setOrigin(0.5);
        this.add.existing(this.scoreText);

        this.livesText = this.add.text(100, 200, 'Lives: ' + this.lives, {
            fontFamily: 'avenir_regular',
            fontSize: '24px',
            color: Phaser.Display.Color.IntegerToColor(colors.black).rgba,   
        }).setOrigin(0.5);
        this.add.existing(this.livesText)

        this.trash = new Trash(this);
        this.trash.spawn(this.keys, 450, 10); 
        this.trash.on('dragend', 
            function (pointer) {
                game.trash.setCrinkled(false);
                game.trash.body.setAllowGravity(true);
                let trashRect = game.trash.getBounds();
                if (Phaser.Geom.Intersects.RectangleToRectangle(trashRect, recyclingBin.getBounds())) {
                    game.correctCheck(game.trash, 'r');
                    game.trash.spawn(game.keys, 450, 10);
                } else if (Phaser.Geom.Intersects.RectangleToRectangle(trashRect, organicsBin.getBounds())) {
                    game.correctCheck(game.trash, 'o');
                    game.trash.spawn(game.keys, 450, 10);
                } else if (Phaser.Geom.Intersects.RectangleToRectangle(trashRect, specialtyBin.getBounds())) {
                    game.correctCheck(game.trash, 's');
                    game.trash.spawn(game.keys, 450, 10);
                } else if (Phaser.Geom.Intersects.RectangleToRectangle(trashRect, trashBin.getBounds())) {
                    game.correctCheck(game.trash, 't');
                    game.trash.spawn(game.keys, 450, 10);
                }
            }
        );
    }

    update() {
        if (this.trash != null && this.trash.y > 900) {
            this.updateLives();
            this.trash.spawn(this.keys, 450, 10);
        }
    }

    correctCheck(gameObject, c) {
        if(gameObject.texture.key[0] == c) {
            this.updateScore();
        } else {
            this.updateLives();
        }
    }
    updateScore() {
        this.score += 100;
        this.scoreText.setText('Score: ' + this.score);
        document.cookie = "score=" + this.score;
    }
    updateLives() {
        this.lives--;
        this.livesText.setText('Lives: ' + this.lives);
        if (this.lives < 1) {
            this.scene.start('game_over');
        }
    }

    
}

export {GameScene};

/*
// We will change this to be scalable based on the user viewpoer dimensions, for now just keep it static.
var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 900,
    backgroundColor: 'rgb(219, 189, 232)',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 100},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

document.getElementById('downloadHighScores').addEventListener('click', () => {
    let file = '';
    for(let i = 0; i < highScores.length; i++){
        file += '\n' + highScores[i] + ',';
    }
    const blob = new Blob([file], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `HighScores.txt`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
});


document.getElementById('loadHighScores').addEventListener('change', function(event) {
    const file = event.target.files[0];
        
    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const contents = e.target.result;
            
        highScores = [];
        const split = contents.split("\n");
        for(let i = 1; i < split.length; i++){
            highScores.push(Number(split[i].split(",")[0]));
        }
    };
    reader.readAsText(file);
});
*/ 
/*
    endGame() {
        gameOver = true;
        gameStarted = false;
        if (trash != null) {
            trash.destroy();
            trash = null;
        }

        recyclingBin.setVisible(false);
        compostBin.setVisible(false);
        specialtyBin.setVisible(false);
        trashBin.setVisible(false);
        scoreText.setVisible(false);
        livesText.setVisible(false);

        highScores.push(score);

        thumbnailText.setVisible(false); // temp

            // Game over message
        scene.add.text(450, 200, 'Game Over!', {
            fontSize: '64px',
            color: '#000000'
        })
        .setOrigin(0.5)
        .setName('gameOverText');

        scene.add.text(450, 275, 'Final Score: ' + score, {
            fontSize: '32px',
            color: '#000000'
        })
        .setOrigin(0.5)
        .setName('finalScoreText');

        scene.add.text(450, 375, 'High Scores', {
            fontSize: '48px',
            color: '#000000'
        })
        .setOrigin(0.5)
        .setName('highScoreText');

        var highestScores = [];
        for(let i = 0; i < highScores.length; i++){
            if(i == 0 || highScores[i] > highestScores[0]){
                highestScores.splice(0, 0, highScores[i]);
            }
            else if(i == 1 || highScores[i] > highestScores[1]){
                highestScores.splice(1, 0, highScores[i]);
            }
            else if(i == 2 || highScores[i] > highestScores[2]){
                highestScores.splice(2, 0, highScores[i]);
            }
            else if(i == 3 || highScores[i] > highestScores[3]){
                highestScores.splice(3, 0, highScores[i]);
            }
            else if(i == 4 || highScores[i] > highestScores[4]){
                highestScores.splice(4, 0, highScores[i]);
            }
        }
        
        scene.add.text(375, 500, '1: ' + highestScores[0] + '\n2: ' + highestScores[1] + '\n3: ' + highestScores[2] +
            '\n4: ' + highestScores[3] + '\n5: ' + highestScores[4], {
            fontSize: '32px',
            color: '#000000'
        })
        .setOrigin(0.5)
        .setName('highScoresText');


        
        document.getElementById('levelButtons').hidden = false;

    }

    restartGame() {  

        score = 0;
        lives = 3;
        gameOver = false;
        gameStarted = true;

        scoreText.setText('Score: ' + score);
        livesText.setText('Lives: ' + lives);

        scoreText.setVisible(true);
        livesText.setVisible(true);

        recyclingBin.setVisible(true);
        compostBin.setVisible(true);
        specialtyBin.setVisible(true);
        trashBin.setVisible(true);

        thumbnailText.setVisible(true); //temp

        scene.children.getByName('gameOverText')?.destroy();
        scene.children.getByName('finalScoreText')?.destroy();
        scene.children.getByName('highScoreText')?.destroy();
        scene.children.getByName('highScoresText')?.destroy();


        spawnTrash(450, 0);
    }


    */

// var selectedLevel = null;

// var highScores = [];