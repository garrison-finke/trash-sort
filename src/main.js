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
    this.add.text(450,450, 'Trash Sort', 
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
        Place holder stuff for before we add trash. 
        Each time you click the spawn verity button, it will spawn one.
        You are able to click and drag the verities. They DO have collisions
        with the walls but collisions with eachother isnt made yet sorrey!
    */
    
    // this.physics.add.collider(verity,verity); // can rem ove later if dont care about trash colliding with eachother.
    document.getElementById('myBtn').addEventListener('click', () => {
    spawnTrash(450, 0);
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
            spawnTrash(450, 9);
        } else if (Phaser.Geom.Intersects.RectangleToRectangle(itemRect, compostRect)) {
            correctCheck(gameObject, 'c');
            gameObject.destroy();
            spawnTrash(450, 9);
        } else if (Phaser.Geom.Intersects.RectangleToRectangle(itemRect, specialtyRect)) {
            correctCheck(gameObject, 's');
            gameObject.destroy();
            spawnTrash(450, 9);
        } else if (Phaser.Geom.Intersects.RectangleToRectangle(itemRect, trashRect)) {
            correctCheck(gameObject, 't');
            gameObject.destroy();
            spawnTrash(450, 9);
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
        updateLives();
        trash.destroy();
        spawnTrash(450, 0);
    }
}

function spawnTrash(x,y) {
    let index = Math.round(Math.random() * keys.length);
    trash = scene.physics.add.sprite(x, y, keys[index]).setScale(0.5);

    // Physics for trash
    // newTrash.setBounce(.5);
    // newTrash.setCollideWorldBounds(false);

    // Dragging stuff
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
}

function correctCheck(gameObject, c) {
    if(gameObject.texture.key[0] == c) {
                updateScore();
    } else {
        updateLives();
    }
}