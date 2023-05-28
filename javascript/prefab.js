class Prefab extends Phaser.Scene 
{
    constructor(key)
    {
        super(key);
    }

    preload ()
    {
        this.load.image('player', 'assets/player/Player.png');
        this.load.image('ground', 'assets/ground.png');
    }

    create () 
    {
        this.cameras.main.setBackgroundColor('#7393B3');
        //this.sys.game.canvas.width;
        //this.sys.game.canvas.height;
        
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.player.setCollideWorldBounds(true);

        //platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(0, 400, 'ground').setScale(0.5).refreshBody();

        // jump 
        this.input.on('pointerdown', this.jump, this);
    }

    jump ()
    {
        if(this.player.body.touching.down)
        {
            this.player.setVelocityY(-500);
        }
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

        if (this.player.y >= this.physics.world.bounds.height - 70) {
            this.player.setPosition(100, 900);
            this.player.setVelocity(0);
        }
    }

    update () 
    {

    }
}

