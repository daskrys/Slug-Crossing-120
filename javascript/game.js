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

    this.input.on('pointerdown', () => this.scene.start('title', { mutevalue: false }));
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
            this.load.audio('logos', 'menu_music.wav');
            this.load.glsl('bundle', 'bundle.glsl.js');
            this.load.audio('click', 'click2start.wav');
    }
    init(data) {
        this.mutevalue = data.mutevalue;
    } 
    create() {

        ///full screen button/////
        const fullText = this.add.text(50, 50, 'full screen', { fontSize: '50px', fill: '#24487a' });
        fullText.setDepth(1);
        fullText.setInteractive();
        fullText.on('pointerover', () => {
            fullText.setStyle({ fill: '#ff0' });
        });
        fullText.on('pointerout', () => {
            fullText.setStyle({ fill: '#24487a' });
        });
        fullText.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
        /////////////////////////////
        
        this.cameras.main.fadeIn(3000);

        this.shader = this.add.shader('Tunnel', 1050, 540, 2100, 1080, [ 'theshader' ]);
        this.shader.setInteractive();
        this.cameras.main.setBackgroundColor('#add8e6')

        const backgroundMusic = this.sound.add('logos', { loop: true });
        if(this.mutevalue == false){
            backgroundMusic.play();
        }
        //options button//
        this.options = this.add.text(1600, 940, 'options', { fontSize: '100px', fill: '#24487a' }).setInteractive()
        this.options.on('pointerdown', () => {
            backgroundMusic.stop()
            this.scene.start('options', { mutevalue: this.mutevalue })
        });
        ////credits button//////
        const creditsText = this.add.text(820, 950, 'credits', { fontSize: '100px', fill: '#24487a' });
        creditsText.setDepth(1);
        creditsText.setInteractive();
            this.tweens.add({
                targets: creditsText,
                duration: 500,
                scaleX: 1.03,
                scaleY: 1.03,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            creditsText.on('pointerover', () => {
                creditsText.setStyle({ fill: '#ff0' });
            });
            creditsText.on('pointerout', () => {
                creditsText.setStyle({ fill: '#24487a' });
            });
            creditsText.on('pointerdown', () => {
                backgroundMusic.stop();
                this.scene.start('credits', { mutevalue: this.mutevalue });
            });


        ///play button////
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
            backgroundMusic.stop();
            this.scene.start('sceneone', { mutevalue: this.mutevalue });
        });


        const clickSound = this.sound.add('click');

        playText.on('pointerdown', () => {
            if(this.mutevalue == false){
                clickSound.play();
            }
            backgroundMusic.stop();
            this.scene.start('sceneone', { mutevalue: this.mutevalue });
        });

        creditsText.on('pointerdown', () => {
            if(this.mutevalue == false){
                clickSound.play();
            }
            backgroundMusic.stop();
            this.scene.start('credits', { mutevalue: this.mutevalue });
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
class options extends Phaser.Scene{
    constructor() {
        super('options')
    }
    preload(){
        this.load.path="./assets/"
        this.load.image('unmuted', 'audio.png')
        this.load.image('muted', 'mute.png')
    }
    init(data) {
        this.mutevalue = data.mutevalue;
    } 
    create(){
        this.cameras.main.setBackgroundColor('#FFF200')
        this.back = this.add.text(1600, 940, 'back', { fontSize: '100px', fill: '#24487a' }).setInteractive()
        this.back.on('pointerdown', () => {
            this.scene.start('title', { mutevalue: this.mutevalue })       
        });
        if(this.mutevalue == false){
            this.createunmute()
        }
        else{
            this.createmute();
        }
    }
    createunmute(){
        this.unmuted = this.add.image(1050, 540, 'unmuted').setInteractive();
                this.unmuted.on('pointerdown', () => {
                    this.mutevalue = true;
                    this.unmuted.destroy();
                    this.createmute()
        });
    }
    createmute(){
        this.muted = this.add.image(1050, 540, 'muted').setInteractive();
                this.muted.on('pointerdown', () => {
                    this.mutevalue = false;
                    this.muted.destroy();
                    this.createunmute()
        });
    }
}


class Credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    preload(){
        this.load.path="./assets/";
    }
    init(data) {
        this.mutevalue = data.mutevalue;
    } 
    create(){
        this.cameras.main.setBackgroundColor('#add8e6')
        ////Back button/////
        const backText = this.add.text(50, 50, 'back', { fontSize: '100px', fill: '#24487a' });
        backText.setDepth(1);

        backText.setInteractive();
        backText.on('pointerover', () => {
            backText.setStyle({ fill: '#ff0' });
        });
        backText.on('pointerout', () => {
            backText.setStyle({ fill: '#24487a' });
        });
        backText.on('pointerdown', () => {
            this.scene.start('title', { mutevalue: this.mutevalue });
        });
        //////////////////////////

        ////text//////
        const colText = this.add.text(50, 200, 'collaborators:\nProduction Lead:Kayla Garcia,\n\nTesting Lead:Christian Perez,\n\nTesting Lead:Jalen Suwa,\n\nTechnology Lead:Chase Houske ', { fontSize: '50px', fill: '#24487a' });
        colText.setDepth(1);

        const artText = this.add.text(50, 600, 'all art done by Kayla Garcia using pixilart.com/photoshop/canva', { fontSize: '50px', fill: '#24487a' });
        artText.setDepth(1);

        const musicText = this.add.text(50, 685, 'all music done by Jalen Suwa using TheLovelyComposer/BFXR', { fontSize: '50px', fill: '#24487a' });
        musicText.setDepth(1);

        const codeText = this.add.text(50, 775, 'code was a group effort including:\n \nChase Houske, Christian Perez, Kayla Garcia', { fontSize: '50px', fill: '#24487a' });
        codeText.setDepth(1);
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
        this.load.audio('bg', 'assets/bg_music.wav');
    }

    init(data) {
        this.mutevalue = data.mutevalue;
    } 

    create () 
    {
        super.create();
        this.spawnSlug();
        this.spawnObstacle();
        this.time.delayedCall(2000, this.spawnTree, [], this);
        this.treespawn = false;

        const backgroundMusic = this.sound.add('bg', { loop: true });

        if(this.mutevalue == false){
            backgroundMusic.play();
        }
        
    }

    update () 
    {
        super.update();
    }
}



class endScreen extends Phaser.Scene{

    preload(){
        this.load.audio('end',"assets/end_screen_music.wav");
    }


    init(data) {
        this.score = data.score;
    }

    constructor(){
        super('endscreen')
    }

    create(){
        this.cameras.main.setBackgroundColor('#FFF200')
        this.add.text(800, 540, 'You Lose!\nSCORE: ' + this.score, { fontFamily: 'Times', fontSize: '80px', fill: '#000000' });

        const sceneOne = this.scene.get('sceneone');
        sceneOne.sound.stopAll(); // Stop all sounds from SceneOne

        const backgroundMusic = this.sound.add('end', { loop: true });
        backgroundMusic.play();
        
    }
}


let config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 2100,
        height: 1080,
    },

    scene: [S0, Title,Credits, SceneOne, endScreen, options],
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