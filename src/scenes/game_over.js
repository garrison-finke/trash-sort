import Phaser from 'phaser';
import { preloadFonts } from '../preloading.js';
import {Button} from '../button.js';

class GameOverScene extends Phaser.Scene {

    preload() {
        preloadFonts(this);
    }

    create() {
        let gameOver = this;

        if(Number(getCookie("score")) > Number(getCookie("highScore"))){
            document.cookie = "highScore=" + Number(getCookie("score"));
        }
        
        this.add.text(450, 200, 'Game Over!', {
                fontFamily: 'avenir_regular',
                fontSize: '64px',
                color: '#000000'
            }).setOrigin(0.5);
        this.add.text(450, 270, 'Your Score: ' + getCookie("score"), {
                fontFamily: 'avenir_regular',
                fontSize: '32px',
                color: '#000000'
            }).setOrigin(0.5);
        this.add.text(450, 330, 'Your Personal Best: ' + getCookie("highScore"), {
                fontFamily: 'avenir_regular',
                fontSize: '32px',
                color: '#000000'
            }).setOrigin(0.5);
        
        let playAgainButton = new Button(gameOver, 450, 450, 'PLAY AGAIN');
        playAgainButton.on('pointerdown',
            function (pointer) {
                gameOver.scene.start('game');
            }
        );
        gameOver.add.existing(playAgainButton);

        let quitButton = new Button(gameOver, 450, 550, 'QUIT');
        quitButton.on('pointerdown',
            function (pointer) {
                gameOver.scene.start('menu');
            }
        );
        gameOver.add.existing(quitButton);
    }
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export {GameOverScene};