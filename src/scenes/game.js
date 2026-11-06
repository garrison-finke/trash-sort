import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.keys = [];
        this.trash = null;
        this.score = 0;
        this.lives = 3;

        this.thumbnailText;
        this.scoreText;
        this.livesText;
        /*
        let thumbnailText = this.add.text(450,450, 'Trash Sort', 
            {
                fontSize: '48px',
                color: '#000000',   
            }).setOrigin(0.5);
        
        let scoreText = this.add.text(100, 100, 'Score: ' + score, 
            {
                fontSize: '24px',
                color: '#000000',   
            }).setOrigin(0.5);

        let livesText = this.add.text(800, 100, 'Lives: ' + lives, 
            {
                fontSize: '24px',
                color: '#000000',   
            }).setOrigin(0.5);
        */
    }
    preload() {
        let trash = import.meta.glob('../../public/assets/trash/*.png');
        Object.entries(trash).forEach(([path]) => {
            let key = path.split('/').pop().replace('.png', '');
            let local = path.split('/').slice(2).join('/');
            this.load.image(key, local);
            this.keys.push(key);
        });

        const bins = import.meta.glob('../../public/assets/bins/*.png');
        Object.entries(bins).forEach(([path]) => {
            const key = path.split('/').pop().replace('.png', '-bin');
            const local = path.split('/').slice(2).join('/');
            this.load.image(key, local);
        });
    }

    create() {
        let game = this;
        var gameOver = false;
        // var selectedLevel = null;

        // var highScores = [];
        
        /*
        //temp-delete this later
        highScores.push(500);
        highScores.push(2000);
        highScores.push(1000);
        highScores.push(100);
        highScores.push(200);
        highScores.push(800);
        */

        game.add.image(100, 750, 'recycling-bin').setScale(0.33);
        game.add.image(333, 750, 'organics-bin').setScale(0.25);
        game.add.image(566, 750, 'specialty-bin').setScale(0.40);
        game.add.image(800, 750, 'trash-bin').setScale(0.25);
        
        game.spawnTrash(450, 10);
        /*
        // Dragging
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.body.setAllowGravity(false);
            gameObject.setVelocity(0, 0);
        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });        

        this.input.on('dragend', function (pointer, gameObject) {

            gameObject.body.setAllowGravity(true);

            const itemRect = gameObject.getBounds();

            if (Phaser.Geom.Intersects.RectangleToRectangle(itemRect, recyclingBin.getBounds())) {
                correctCheck(gameObject, 'r');
                gameObject.destroy();
                if (!gameOver) {
                    spawnTrash(450, 9);
                }
            }

            else if (Phaser.Geom.Intersects.RectangleToRectangle(itemRect, compostBin.getBounds())) {
                correctCheck(gameObject, 'o');
                gameObject.destroy();
                if (!gameOver) {
                    spawnTrash(450, 9);
                }
            }

            else if (Phaser.Geom.Intersects.RectangleToRectangle(itemRect, specialtyBin.getBounds())) {
                correctCheck(gameObject, 's');
                gameObject.destroy();
                if (!gameOver) {
                    spawnTrash(450, 9);
                }
            }

            else if (Phaser.Geom.Intersects.RectangleToRectangle(itemRect, trashBin.getBounds())) {
                correctCheck(gameObject, 't');
                gameObject.destroy();
                if (!gameOver) {
                    spawnTrash(450, 9);
                }
            }
        });
        this.spawnTrash(450, 9);
        */
    }

    update() {
        if (this.trash != null && this.trash.y > 900) {
            this.trash.destroy();
            this.trash = null;

            this.updateLives();

            if (!this.gameOver) {
                this.spawnTrash(450, 0);
            }
        }
    }
    
    spawnTrash(x, y) {
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
        let index = Math.floor(Math.random() * this.keys.length);
        let selectedItem = this.keys[index]
        this.trash = this.physics.add.image(x, y, selectedItem);
        this.trash.setScale(0.5);
        this.trash.setInteractive();
        this.input.setDraggable(this.trash);
    }
    /*
    updateScore() {
        score += 100;
        scoreText.setText('Score: ' + score);
    }
    */
    updateLives() {
        let game = this;
        game.lives--;
        //livesText.setText('Lives: ' + lives);

        if (game.lives < 1) {
            game.scene.start('gameover');
            //endGame();
        }
    }
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

    correctCheck(gameObject, c) {
        if(gameObject.texture.key[0] == c) {
            updateScore();
        } else {
            updateLives();
        }
    }
    */
}

export {GameScene};

/*
document.querySelectorAll('#levelButtons button').forEach(button => {
    button.addEventListener('click', () => {
        if (gameStarted)
            return;

        selectedLevel = button.dataset.level;
        document.getElementById('levelButtons').hidden = true;

        if (gameOver) {
            restartGame();
        } else {
            gameStarted = true;
            spawnTrash(450, 0);
        }
    })
})

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