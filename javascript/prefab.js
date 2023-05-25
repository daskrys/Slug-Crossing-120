class Prefab extends Phaser.Scene 
{
    constructor(key)
    {
        super(key);
    }

    preload ()
    {
        this.load.image('player', 'assets/circle.png');
    }

    create () 
    {
        this.cameras.main.setBackgroundColor('#7393B3');
        // adds player to 
        this.player = this.physics.add.sprite(100, 900, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.15);
        // text for testing delete later
        this.add.text(150,150, "Test - Top Left of World", {color: '#FFFFFF'}).setFontSize(30);
        this.add.text(150,800, "Test - WASD to move", {color: '#FFFFFF'}).setFontSize(30);
        this.add.text(2500,2500, "Test - Bottom Right of World", {color: '#FFFFFF'}).setFontSize(30);
        // add keys from keyboard
        this.keys = this.input.keyboard.addKeys("W, A, S, D, SPACE"); 

    }

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
        this.move();


    }
}

