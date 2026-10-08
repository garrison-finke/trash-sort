import Phaser, { Physics } from 'phaser';
import { version } from 'react';
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

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('smile' , 'assets/smile.png');
}

function create ()
{

    this.add.text(450,450, 'Trash Sort', 
        {
            fontSize: '48px',
            color: '#000000',   
        }).setOrigin(0.5);

    this.add.image(200,200, 'smile').setScale(.5).refreshBody();

    version
}

function update ()
{
}
