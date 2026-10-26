import Phaser from 'phaser';

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

var keys;
var trash;
var recyclingBin;
var compostBin;
var specialtyBin;
var trashBin;
var score = 0;
var lives = 3;
var scoreText;
var livesText;
var gameStarted = false;
var gameOver = false;
var selectedLevel = null;

// This is how we filter out what items show up on what level. null is everything.
const levelItems = {
    regular: null,
    oss: ['organics-coffee-grounds'],
    asc: null,
    scc: null
};

var highScores = [];
var thumbnailText;

var scene; // keep this so I dont gotta type game.scene.scenes like 9999 times

var game = new Phaser.Game(config);

function preload ()
{
    keys = [];
    const trash = import.meta.glob('../public/assets/trash/*.png');
    Object.entries(trash).forEach(([path]) => {
        const key = path.split('/').pop().replace('.png', '');
        const local = path.split('/').slice(2).join('/');
        this.load.image(key, local);
        keys.push(key);
    });

    const bins = import.meta.glob('../public/assets/bins/*.png');
    Object.entries(bins).forEach(([path]) => {
        const key = path.split('/').pop().replace('.png', '-bin');
        const local = path.split('/').slice(2).join('/');
        this.load.image(key, local);
    });
}

function create ()
{
    scene = this;
    
    //temp-delete this later
    highScores.push(500);
    highScores.push(2000);
    highScores.push(1000);
    highScores.push(100);
    highScores.push(200);
    highScores.push(800);

    thumbnailText = this.add.text(450,450, 'Trash Sort', 
        {
            fontSize: '48px',
            color: '#000000',   
        }).setOrigin(0.5);
    
    scoreText = this.add.text(100, 100, 'Score: ' + score, 
        {
            fontSize: '24px',
            color: '#000000',   
        }).setOrigin(0.5);

    livesText = this.add.text(800, 100, 'Lives: ' + lives, 
        {
            fontSize: '24px',
            color: '#000000',   
        }).setOrigin(0.5);

    recyclingBin = this.add.sprite(100, 750, 'recycling-bin').setScale(0.33);
    compostBin = this.add.sprite(333, 750, 'organics-bin').setScale(0.25);
    specialtyBin = this.add.sprite(566, 750, 'specialty-bin').setScale(0.40);
    trashBin = this.add.sprite(800, 750, 'trash-bin').setScale(0.25);

    /* 
    * click da buttons to play da game
    */ 
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
        const recyclingRect = recyclingBin.getBounds();
        const compostRect = compostBin.getBounds();
        const specialtyRect = specialtyBin.getBounds();
        const trashRect = trashBin.getBounds();

        // hitboxes are wacky ass, yo
        if (Phaser.Geom.Intersects.RectangleToRectangle(itemRect, recyclingRect)) {
            correctCheck(gameObject, 'r');
            gameObject.destroy();
            if (!gameOver) {
                spawnTrash(450, 9);
            }
        }

        else if (Phaser.Geom.Intersects.RectangleToRectangle(itemRect, compostRect)) {
            correctCheck(gameObject, 'o');
            gameObject.destroy();
            if (!gameOver) {
                spawnTrash(450, 9);
            }
        }

        else if (Phaser.Geom.Intersects.RectangleToRectangle(itemRect, specialtyRect)) {
            correctCheck(gameObject, 's');
            gameObject.destroy();
            if (!gameOver) {
                spawnTrash(450, 9);
            }
        }

        else if (Phaser.Geom.Intersects.RectangleToRectangle(itemRect, trashRect)) {
            correctCheck(gameObject, 't');
            gameObject.destroy();
            if (!gameOver) {
                spawnTrash(450, 9);
            }
        }




        // When letting go of object, it will now fling in the direction
        // of where the pointer was going, also takes note of pointer's velocity. 
        /*
        const flingSpeedX = pointer.velocity.x;
        const flingSpeedY = pointer.velocity.y;
        gameObject.body.setVelocity(flingSpeedX, flingSpeedY);
        */

    });

}

/*
    Careful running code in update(), this function
    will run once *every* frame, very possible to 
    accidentally create evil loops! Notice I put button
    checking logic in create instead of update().
*/
function update ()
{
    if (trash != null && trash.y > 900) {
        trash.destroy();
        trash = null;

        updateLives();

        if (!gameOver) {
            spawnTrash(450, 0);
        }
    }
}

function spawnTrash(x, y) {
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

    trash = scene.physics.add.sprite(x, y, selectedItem);
    trash.setScale(0.5);

    trash.setInteractive();
    scene.input.setDraggable(trash);
}

function updateScore() {
    score += 100;
    scoreText.setText('Score: ' + score);
}

function updateLives() {
    lives--;
    livesText.setText('Lives: ' + lives);

    if (lives < 1) {
        endGame();
    }
}

function endGame() {
    gameOver = true;
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

function restartGame() {  

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

function correctCheck(gameObject, c) {
    if(gameObject.texture.key[0] == c) {
                updateScore();
    } else {
        updateLives();
    }
}