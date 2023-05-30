class Prefab extends Phaser.Scene 
{
    constructor(key)
    {
        super(key);
    }

    preload ()
    {
        this.load.image('ground', 'assets/ground.png');
        this.load.atlas('player', 'assets/player/playersheet.png', 'JSON/player.json');
        this.load.atlas('slug', 'assets/slug.png', 'JSON/slug.json');
        this.load.image('life', 'assets/player/player.png');

        // place holders below for testing
        this.load.image('background', 'assets/background-placeholder.png');
        this.load.image('obstacle', 'assets/circle.png');
        this.load.image('tree', 'assets/obstacles/Tree.png');
    }

    create () 
    {
        // background
        this.cameras.main.setBackgroundColor('#7393B3');
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
        this.background.setOrigin(0, 0);

        //platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(300, 350, 'ground').setScale(1).refreshBody();

        // running animation
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'run', start: 1, end: 6
            }), 
            frameRate: 10,
            repeat: -1,
        });

        // jumping animation
        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'jump', start: 1, end: 6
            }), 
            frameRate: 10,
            repeat: -1,
        });

        // rolling animation
        this.anims.create({
            key: 'rolling',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'roll', start: 1, end: 6
            }), 
            frameRate: 10,
            repeat: -1,
        });

        // slug animation
        this.anims.create({
            key: 'slugwalk',
            frames: this.anims.generateFrameNames('slug', {
                prefix: 'slug', start: 1, end: 4
            }), 
            frameRate: 10,
            repeat: -1,
        });
        

        // player
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.physics.add.collider(this.player, this.platforms); 
        this.player.anims.play('running');

        //obstacle test
        this.obstacle = this.physics.add.group();
        
        // slug collectable
        this.slugs = this.physics.add.group();

        // jump 
        this.input.on('pointerdown', this.jump, this);
        this.player.airjump = false;

        //hud things will probably need rework
        this.score = 0;
        this.scoreBox = this.add.text(20, 25, 'SCORE: 0', { fontFamily: 'Times', fontSize: '20px', fill: '#FFFFFF' });

        this.lives = this.add.group({
            key: 'life', 
            repeat: 2,
            setXY: {x: 350, y: 25, stepX: 30}
        });
    }

    collectSlug (player, slug)
    {
        slug.disableBody(true, true);
        
        // updates
        ++this.score;
        this.scoreBox.setText('SCORE: ' + this.score);
    }

    spawnObstacle ()
    {
        let obstacle = this.obstacle.create(1750, 310, 'obstacle');
        obstacle.setGravityY(-300).setGravityX(-100).setScale(0.1);
        
        this.physics.add.overlap(this.player, obstacle, this.hit, null, this);

        this.time.delayedCall(Phaser.Math.Between(5000, 10000), this.spawnObstacle, [], this);
    }

    spawnSlug ()
    {
        let slug = this.slugs.create(1000, 310, 'slug');
        slug.setGravityY(-300).setGravityX(-10);
        slug.anims.play('slugwalk');
        this.physics.add.overlap(this.player, slug, this.collectSlug, null, this);

        /*this.slug = this.physics.add.sprite(2320, 310, 'slug')
                .setImmovable(true)
                .setGravityY(-300)
                .setGravityX(-10);
        this.slug.anims.play('slugwalk'); */
        this.time.delayedCall(Phaser.Math.Between(5000, 10000), this.spawnSlug, [], this);
    }

    hit (player, obstacle)
    {
        obstacle.disableBody(true, true);
        this.player.anims.play('rolling');

        this.time.delayedCall(1500, () => {
            this.player.anims.play('running');
        });

        this.loseLife();
    }

    loseLife () // called when a life needs to be deleted
    {
        let life = this.lives.getChildren();

        if(life.length > 0)
        {
            let lifeCount = life[life.length - 1];
            this.lives.remove(lifeCount);
            lifeCount.destroy();
        }
        else 
        {
            // no more lives game ends
            console.log("GAME OVER");
        }
    }

    jump ()
    {
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
            this.player.anims.play('running');
        });
    }   

    update () 
    {   
        if(this.player.body.touching.down)
        {
            this.player.airjump = true;
        }

        this.background.tilePositionX += 1;
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
}

