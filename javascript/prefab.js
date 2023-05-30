class Prefab extends Phaser.Scene 
{
    constructor(key)
    {
        super(key);
    }

    preload ()
    {
        this.load.image('ground', 'assets/ground.png');
        this.load.image('background', 'assets/background-placeholder.png');
        this.load.atlas('player', 'assets/player/playersheet.png', 'JSON/player.json');
        this.load.atlas('slug', 'assets/slug.png', 'JSON/slug.json');
        //Temporary test tree from my physics demo
        this.load.image('tree', 'assets/obstacles/Tree.png')
    }

    create () 
    {
        this.cameras.main.setBackgroundColor('#7393B3');
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
        this.background.setOrigin(0, 0);

        //platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(300, 350, 'ground').setScale(1).refreshBody();

        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'run', start: 1, end: 6
            }), 
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'jump', start: 1, end: 6
            }), 
            frameRate: 10,
            repeat: -1,
        });

        this.player = this.physics.add.sprite(100, 100, 'player');
        this.physics.add.collider(this.player, this.platforms); 
        this.player.anims.play('running');
        
        // jump 
        this.input.on('pointerdown', this.jump, this);
        this.player.airjump = false;
    }

    jump ()
    {
        this.player.anims.stop('running');
        this.player.anims.play('jumping');
        
        if(this.player.body.touching.down)
        {
            this.player.setVelocityY(-200);
            this.recenttime = this.game.getTime();
        }
        else if ((this.player.body.touching.down == false) && ((this.game.getTime() - this.recenttime) > 500) && this.player.airjump){
            this.player.airjump = false;
            this.player.setVelocityY(-200);
        }

        this.time.delayedCall(1500, () => {
            this.player.anims.stop('jump');
            this.player.anims.play('running');
        });
    }   
    // currently not used as since it has to have touch controls
    move () // allows for movement of player in 4 directions as well as jump - if gravity is enabled
    {
        const speed = 4;
        if(this.keys.W.isDown)
        {
            this.player.y -= speed;
        }

        if(this.keys.S.isDown)
        {
            this.player.y += speed;
        }
        
        if(this.keys.A.isDown)
        {
            this.player.x -= speed;
            this.player.flipX = false;
        }

        if(this.keys.D.isDown)
        {
            this.player.x += speed;
            this.player.flipX = true;
        }

        if(this.keys.SPACE.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-370);
        }

        if (this.player.y >= this.physics.world.bounds.height - 70) 
        {
            this.player.setPosition(100, 900);
            this.player.setVelocity(0);
        }
    }

    update () 
    {   
        if(this.player.body.touching.down)
        {
            this.player.airjump = true;
        }
        //this.player.anims.play('running');
        this.background.tilePositionX += 1;
    }
}

