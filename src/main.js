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
            gravity: {y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var verity;
var scene; // keep this so I dont gotta type game.scene.scenes like 9999 times

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('smile' , 'assets/smile.png'); //temp obviosuly
}

function create ()
{
    scene = this;
    this.add.text(450,450, 'Trash Sort', 
        {
            fontSize: '48px',
            color: '#000000',   
        }).setOrigin(0.5);

        /* 
            Place holder stuff for before we add trash. 
            Each time you click the spawn verity button, it will spawn one.
            You are able to click and drag the verities. They DO have collisions
            with the walls but collisions with eachother isnt made yet sorrey!
        */
        verity = this.physics.add.group(); 
        this.physics.add.collider(verity,verity); // can rem ove later if dont care about trash colliding with eachother.
        document.getElementById('myBtn').addEventListener('click', () => {
        spawnVerity(450, 450);
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

function spawnVerity(x,y) {
    var newVerity = verity.create(x,y, 'smile');

        // Physics for verity
        newVerity.setScale(0.2);
        newVerity.setBounce(.5);
        newVerity.setCollideWorldBounds(true);

        // Dragging stuff
        newVerity.setInteractive();
        scene.input.setDraggable(newVerity);
}
