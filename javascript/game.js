class S0 extends Phaser.Scene {
    constructor() {
        super('s0');
    }
    create() {
    this.cameras.main.setBackgroundColor('#000000');

    this.textObject0 = this.add.text(
            735, //x
            350,//y
            "click to progress", //text
            {
                font: "100px Arial",
                color: "#FFFFFF",
                align: "center"
            } //style
        );
    //textObject0.setAlpha(1);
    this.tweens.add({
        targets: this.textObject0,
        alpha:0,
        duration: 2000,
        repeat: -1,
    });
    //textObject0.setAlpha(1);
    this.tweens.add({
        targets: this.textObject8,
        alpha:0,
        duration: 2000,
        repeat: -1,
    });

    this.input.on('pointerdown', () => this.scene.start('title'));
    }
}



class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }
    preload(){
            this.load.path="./assets/";
            this.load.image('title','slug crossing.png');
            this.load.image('theshader','shade2.png');
            this.load.audio('logos', 'logos.wav');
            this.load.glsl('bundle', 'bundle.glsl.js')
    }
    create() {
        this.shader = this.add.shader('Tunnel', 1050, 540, 2100, 1080, [ 'theshader' ]);
        this.shader.setInteractive();
        this.cameras.main.setBackgroundColor('#add8e6')

        const backgroundMusic = this.sound.add('logos', { loop: false });
        backgroundMusic.play();

        const playText = this.add.text(900, 800, 'play', { fontSize: '100px', fill: '#24487a' });
        playText.setDepth(1);
        playText.setInteractive();

      
            this.tweens.add({
                targets: playText,
                duration: 500,
                scaleX: 1.03,
                scaleY: 1.03,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        

        playText.on('pointerover', () => {
            playText.setStyle({ fill: '#ff0' });
        });
        playText.on('pointerout', () => {
            playText.setStyle({ fill: '#24487a' });
        });
        playText.on('pointerdown', () => {
            this.scene.start('sceneone');
        });

        const title = this.add.image(500, -100, 'title');
        //title.setScale(10); Doing this made it blurry, so I made a nonblurry title 10x the size
        title.setOrigin(0);
        title.setDepth(0);
        title.setInteractive();

        title.on('pointerover', () => {
            this.tweens.add({
                targets: title,
                duration: 100,
                x: '+=10',
                y: '+=10',
                repeat: -1,
                yoyo: true
            });
        });

        title.on('pointerout', () => {
            this.tweens.killTweensOf(title);
            title.setPosition(500, -100);
        });
        
        
    
    }
}

class SceneOne extends Prefab
{
    constructor ()
    {
        super('sceneone');
    }

    preload ()
    {
        super.preload();
    }

    create () 
    {
        super.create();
        this.spawnSlug();
        this.spawnObstacle();
        this.time.delayedCall(2000, this.spawnTree, [], this);
        this.treespawn = false;
    }

    update () 
    {
        super.update();
    }
}
class endScreen extends Phaser.Scene{
    init(data) {
        this.score = data.score;
    }
    constructor(){
        super('endscreen')
    }
    create(){
        this.cameras.main.setBackgroundColor('#FFF200')
        console.log(this.score)
        this.add.text(800, 540, 'You Lose!\nSCORE: ' + this.score, { fontFamily: 'Times', fontSize: '80px', fill: '#000000' });
    }
}


let config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 2100,
        height: 1080,
    },

    scene: [S0, Title, SceneOne, endScreen],
    title: "Slug Crossing",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            //debug: true
        }
    },
}

const game = new Phaser.Game(config);