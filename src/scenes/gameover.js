import Phaser from 'phaser';

class GameOverScene extends Phaser.Scene {

    create() {
        this.add.text(450, 200, 'Game Over!', {
                fontSize: '64px',
                color: '#000000'
            })
            .setOrigin(0.5)
            .setName('gameOverText');
    }

}