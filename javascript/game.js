class SceneZero extends Phaser.Scene {
    
    constructor() 
    {
        super('scenezero');
    }
    
    create() 
    {
    
        this.cameras.main.setBackgroundColor('#000000');

        this.textObject0 = this.add.text(
            120, 
            350,
            "click to progress", 
            {
                font: "50px Arial",
                color: "#FFFFFF",
                align: "center"
            } //style
        );

        this.tweens.add({
            targets: this.textObject0,
            alpha:0,
            duration: 2000,
            repeat: -1,
        });

        this.tweens.add({
            targets: this.textObject8,
            alpha:0,
            duration: 2000,
            repeat: -1,
        });

        this.input.on('pointerdown', () => this.scene.start('title', { mutevalue: false, mutevalue2: false }));
    }
}

class Title extends Phaser.Scene
{
    constructor() 
    {
        super('title');
    }

    preload()
    {
        
        this.load.path="./assets/";
        this.load.image('title','slug crossing.png');
        this.load.image('background','background.png');
        this.load.audio('logos', 'menu_music.wav');
        this.load.glsl('bundle', 'bundle.glsl.js');
        this.load.audio('click', 'click2start.wav');
    }

    init(data)
    {
        this.mutevalue = data.mutevalue;
        this.mutevalue2 = data.mutevalue2;
    }

    create() 
    {    
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
        this.background.setOrigin(0, 0).setDepth(0);

        const fullText = this.add.text(50, 50, 'Fullscreen', { fontSize: '20px', fill: '#FFF' });

        fullText.setDepth(1);
        fullText.setInteractive();
        fullText.on('pointerover', () => {
            fullText.setStyle({ fill: '#ff0' });
        });

        fullText.on('pointerout', () => {
            fullText.setStyle({ fill: '#FFF' });
        });

        fullText.on('pointerdown', () => {

            if (this.scale.isFullscreen) 
            {
                this.scale.stopFullscreen();
            } 
            else 
            {
                this.scale.startFullscreen();
            }

        });
        
        this.cameras.main.fadeIn(3000);

       // this.shader = this.add.shader('Tunnel', 1050, 540, 2100, 1080, [ 'theshader' ]);
       // this.shader.setInteractive();
        this.cameras.main.setBackgroundColor('#add8e6')

        const backgroundMusic = this.sound.add('logos', { loop: true });

        if(this.mutevalue == false)
        {
            backgroundMusic.play();
        }
        else
        {
            this.add.text(1250, 25, 'Background Music Plays', { fontFamily: 'Times', fontSize: '80px', fill: '#000000' });
        }

        this.options = this.add.text(250, 560, 'options', { fontSize: '30px', fill: '#FF0' }).setInteractive();
        this.options.setDepth(1);
        this.options.setInteractive();
        
        this.options.on('pointerover', () => {
            this.options.setStyle({fill: '#FFF'});
        })

        this.options.on('pointerout', () => {
            this.options.setStyle({ fill: '#FF0' });
        });

        this.options.on('pointerdown', () => {
            backgroundMusic.stop()
            this.scene.start('options', { mutevalue: this.mutevalue, mutevalue2: this.mutevalue2})
        });

        const creditsText = this.add.text(250, 600, 'credits', { fontSize: '30px', fill: '#FF0' });
        creditsText.setDepth(1);
        creditsText.setInteractive();

        creditsText.on('pointerover', () => {
            creditsText.setStyle({ fill: '#FFF' });
        });

        creditsText.on('pointerout', () => {
            creditsText.setStyle({ fill: '#FF0' });
        });

        creditsText.on('pointerdown', () => {
            backgroundMusic.stop();
            this.scene.start('credits', { mutevalue: this.mutevalue, mutevalue2: this.mutevalue2 });
        });

        const playText = this.add.text(255, 520, 'play', { fontSize: '30px', fill: '#FF0' });
        playText.setDepth(1);
        playText.setInteractive();

        this.tweens.add({
            targets: [playText, creditsText, this.options],
            duration: 500,
            scaleX: 1.03,
            scaleY: 1.03,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        playText.on('pointerover', () => {
            playText.setStyle({ fill: '#FFF' });
        });

        playText.on('pointerout', () => {
            playText.setStyle({ fill: '#FF0' });
        });

        playText.on('pointerdown', () => {
            backgroundMusic.stop();
            this.scene.start('sceneone', { mutevalue: this.mutevalue, mutevalue2: this.mutevalue2 });
        });


        const clickSound = this.sound.add('click');

        playText.on('pointerdown', () => {
            if(this.mutevalue == false){
                clickSound.play();
            }
            backgroundMusic.stop();
            this.scene.start('sceneone', { mutevalue: this.mutevalue, mutevalue2: this.mutevalue2 });
        });

        creditsText.on('pointerdown', () => {
            if(this.mutevalue == false){
                clickSound.play();
            }
            backgroundMusic.stop();
            this.scene.start('credits', { mutevalue: this.mutevalue, mutevalue2: this.mutevalue2 });
        });

        const title = this.add.image(50, 50, 'title');
        title.setOrigin(0);
        title.setDepth(0);
        title.setInteractive();
        title.setScale(0.5);

        title.on('pointerover', () => {
            this.tweens.add({
                targets: title,
                duration: 300,
                x: '+=10',
                y: '+=10',
                repeat: -1,
                yoyo: true
            });
        });

        title.on('pointerout', () => {
            this.tweens.killTweensOf(title);
            title.setPosition(50, 50);
        });
    }
}

class Options extends Phaser.Scene
{
    constructor() 
    {
        super('options')
    }

    preload()
    {
        this.load.path="./assets/"
        this.load.image('unmuted', 'audio.png')
        this.load.image('muted', 'mute.png')
    }

    init(data)
    {
        this.mutevalue = data.mutevalue;
        this.mutevalue2 = data.mutevalue2;
    }

    create()
    {
        this.cameras.main.setBackgroundColor('#FFF200')
        this.back = this.add.text(1600, 940, 'back', { fontSize: '100px', fill: '#24487a' }).setInteractive()
        this.back.on('pointerdown', () => {
            this.scene.start('title', { mutevalue: this.mutevalue, mutevalue2: this.mutevalue2 })       
        });
        this.add.text(675, 340, 'Music', { fontFamily: 'Times', fontSize: '80px', fill: '#000000' });
        this.add.text(1275, 340, 'Sounds', { fontFamily: 'Times', fontSize: '80px', fill: '#000000' });

        if(this.mutevalue == false)
        {
            this.createbuttons(this.unmuted, this.muted, true, false, 750, 540, 1)
            
        }
        else
        {
            this.createbuttons(this.muted, this.unmuted, false, true, 750, 540, 1);
        }

        if(this.mutevalue2 == false)
        {
            //console.log("yes")
            this.createbuttons(this.unmuted2, this.muted2, true, false, 1350, 540, 2)
        }
        else
        {
            this.createbuttons(this.muted2, this.unmuted2, false, true, 1350, 540, 2);
        }
    }

    createbuttons(name, name2, mut1, mut2, cord1, cord2, mutval)
    {
        let which = 'unmuted';

        if(mut1 == false)
        {
            which = 'muted'
        }

        name = this.add.image(cord1, cord2, which).setInteractive();
                name.on('pointerdown', () => {
                    if(mutval == 1)
                    {
                        //console.log('this')
                        this.mutevalue = mut1;
                    }
                    else
                    {
                        //console.log('that')
                        this.mutevalue2 = mut1;
                    }

                    name.destroy();
                    //console.log("new value:" + mutval + "mutevalue2: " + this.mutevalue2)
                    this.createbuttons(name2, name, mut2, mut1, cord1, cord2, mutval)
        });
    }
    /*createmute(name, name2){
        name = this.add.image(1050, 540, 'muted').setInteractive();
                name.on('pointerdown', () => {
                    this.mutevalue = false;
                    this.muted.destroy();
                    this.createunmute(this.unmuted, this.muted)
        });
    }*/
}

class Credits extends Phaser.Scene 
{
    constructor() 
    {
        super('credits');
    }

    preload()
    {
        this.load.path="./assets/";
        this.load.image('background','background.png');
    }

    init(data) 
    {
        this.mutevalue = data.mutevalue;
        this.mutevalue2 = data.mutevalue2;
    } 

    create()
    {
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
        this.background.setOrigin(0, 0).setDepth(0);
        ////Back button/////
        const backText = this.add.text(50, 50, 'back', { fontSize: '20px', fill: '#FF0' });
        backText.setDepth(1);
        backText.setInteractive();
        backText.on('pointerover', () => {
            backText.setStyle({ fill: '#FFF' });
        });

        backText.on('pointerout', () => {
            backText.setStyle({ fill: '#FF0' });
        });

        backText.on('pointerdown', () => {
            this.scene.start('title', { mutevalue: this.mutevalue, mutevalue2: this.mutevalue2 });
        });

        const colText = this.add.text(110, 165, '       Collaborators:\n\nProduction Lead - Kayla Garcia\nTesting Lead - Christian Perez\nTesting Lead - Jalen Suwa\nTechnology Lead -Chase Houske', { fontSize: '21px', fill: '#FF0' });
        colText.setDepth(1);

        const artText = this.add.text(110, 400, 'All art created by Kayla Garcia \nTools: Pixilart.com, Photoshop, Canva', { fontSize: '17px', fill: '#FF0' });
        artText.setDepth(1);

        const musicText = this.add.text(110, 450, 'All music created by Jalen Suwa \nTools: TheLovelyComposer, BFXR', { fontSize: '17px', fill: '#FF0' });
        musicText.setDepth(1);

        const codeText = this.add.text(110, 500, 'Game Programming: \nChase Houske, Christian Perez, Kayla Garcia', { fontSize: '17px', fill: '#FF0' });
        codeText.setDepth(1);
    }
}

class SceneOne extends Prefab
{
    constructor()
    {
        super('sceneone');

    }
    
    preload()
    {
        super.preload();
        this.load.audio('bg', 'assets/bg_music.wav');
    }

    init(data) 
    {
        this.mutevalue = data.mutevalue;
        this.mutevalue2 = data.mutevalue2;
    } 

    create() 
    {   
        super.create();
        this.spawnSlug();
        this.spawnBird();
        this.spawnObstacle();
        this.time.delayedCall(2000, this.spawnTree, [], this);
        this.treespawn = false;

        const backgroundMusic = this.sound.add('bg', { loop: true });

        if(this.mutevalue == false)
        {
            backgroundMusic.play();
        }
        else
        {
            this.add.text(1250, 25, 'Background Music Plays', { fontFamily: 'Times', fontSize: '80px', fill: '#000000' });
        }
    }

    update() 
    {
        super.update();
    }
}



class EndScreen extends Phaser.Scene
{
    preload()
    {
        this.load.audio('end',"assets/end_screen_music.wav");
    }

    init(data) 
    {
        this.score = data.score;
        this.mutevalue = data.mutevalue;
        this.mutevalue2 = data.mutevalue2;
    }

    constructor()
    {
        super('endscreen')
    }

    create()
    {
        this.cameras.main.setBackgroundColor('#FFF200')
        this.add.text(900, 440, 'You Lose!\nSCORE: ' + this.score, { fontFamily: 'Times', fontSize: '80px', fill: '#000000' });

        const sceneOne = this.scene.get('sceneone');
        sceneOne.sound.stopAll(); 

        const backgroundMusic = this.sound.add('end', { loop: true });

        if(this.mutevalue == false)
        {
            backgroundMusic.play();
        }
        else
        {
            this.add.text(1450, 25, 'Loss Music Plays', { fontFamily: 'Times', fontSize: '80px', fill: '#000000' });
        }

        this.playagain = this.add.text(900, 740, 'Play Again ', { fontFamily: 'Times', fontSize: '80px', fill: '#000000' }).setInteractive();
        this.playagain.on('pointerdown', () => {
            backgroundMusic.stop()
            this.scene.start('sceneone', { mutevalue: this.mutevalue, mutevalue2: this.mutevalue2 })
        });
    }
}


let config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 600,
        height: 1000,
    },
    scene: [Credits],
    //scene: [SceneZero, Title,Credits, SceneOne, EndScreen, Options],
    title: "Slug Crossing",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000},
            //debug: true
        }
    },
}

const game = new Phaser.Game(config);