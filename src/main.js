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

var trash;
var scene; // keep this so I dont gotta type game.scene.scenes like 9999 times

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('apple-core' , 'assets/trash/organics-apple-core.png'); //temp obviosuly
    this.load.image('compost' , 'assets/bins/compost.png');
    this.load.image('recycling' , 'assets/bins/recycling.png');
    this.load.image('special' , 'assets/bins/special-recycling.png');
    this.load.image('trash' , 'assets/bins/trash.png');
}

function create ()
{
    scene = this;
    this.add.text(450,450, 'Trash Sort', 
        {
            fontSize: '48px',
            color: '#000000',   
        }).setOrigin(0.5);

        const recyclingBin = this.add.sprite(100, 750, 'recycling');
        recyclingBin.setScale(0.33);

        const compostBin = this.add.sprite(333, 750, 'compost');
        compostBin.setScale(0.25);

        const specialRecyclingBin = this.add.sprite(566, 750, 'special');
        specialRecyclingBin.setScale(0.40);

        const trashBin = this.add.sprite(800, 750, 'trash');
        trashBin.setScale(0.25);
        

        /* 
            Place holder stuff for before we add trash. 
            Each time you click the spawn verity button, it will spawn one.
            You are able to click and drag the verities. They DO have collisions
            with the walls but collisions with eachother isnt made yet sorrey!
        */
        trash = this.physics.add.group(); 
        // this.physics.add.collider(verity,verity); // can rem ove later if dont care about trash colliding with eachother.
        document.getElementById('myBtn').addEventListener('click', () => {
        spawnTrash(300, 0);
        spawnTrash(600, 0);
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

            // When letting go of object, it will now fling in the direction
            // of where the pointer was going, also takes note of pointer's velocity. 
            const flingSpeedX = pointer.velocity.x;
            const flingSpeedY = pointer.velocity.y;
            gameObject.body.setVelocity(flingSpeedX, flingSpeedY);

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

}

function spawnTrash(x,y) {
    var newTrash = trash.create(x,y, 'apple-core');

        // Physics for trash
        newTrash.setScale(0.5);
        // newTrash.setBounce(.5);
        newTrash.setCollideWorldBounds(false);

        // Dragging stuff
        newTrash.setInteractive();
        scene.input.setDraggable(newTrash);
}