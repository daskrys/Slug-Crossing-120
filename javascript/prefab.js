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
        this.load.atlas('bird', 'assets/bird.png', 'JSON/bird.json');
        //this.load.image('life', 'assets/player/player.png');

        // place holders below for testing
        this.load.image('background', 'assets/dark back.png');
        this.load.image('obstacle', 'assets/circle.png');
        this.load.image('tree', 'assets/obstacles/Tree.png');
        this.load.image('wall', 'assets/TempDeathWall.png');
        this.load.image('star', 'assets/star.png');
        this.load.audio('blip', 'assets/blip.mp3');
        this.load.audio('jumpSound', 'assets/jump.mp3');
    }

    create () 
    {
        this.jumpSound = this.sound.add('jumpSound');
        this.config = {
            "jumpvel": "-200",
            "objspd": "-80"

        }
        // background
        //this.cameras.main.setBackgroundColor('#7393B3');
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
        this.background.setOrigin(0, 0);

        //platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(300, 1050, 'ground').setScale(1).refreshBody();
        this.platforms.create(2400, 1050, 'ground').setScale(1).refreshBody();
        //Temporary death wall, will be giant monster slug eventually
        this.wall = this.platforms.create(100, 770, 'wall').refreshBody(); 
        
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

        // bird animation
        this.anims.create({
            key: 'birdfly',
            frames: this.anims.generateFrameNames('bird', {
                prefix: 'bird', start: 1, end: 4
            }), 
            frameRate: 10,
            repeat: -1,
        });

        // player
        this.player = this.physics.add.sprite(400, 785, 'player')
            .setScale(1.5)  
            .setSize(20, 40)
        this.player.body.setOffset(8, 8)
        this.player.curspeed = 0;
            
            
        this.physics.add.collider(this.player, this.platforms); 
        this.physics.add.overlap(this.player, this.wall, this.endGame, null, this);
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
        this.scoreBox = this.add.text(20, 25, 'SCORE: 0', { fontFamily: 'Times', fontSize: '40px', fill: '#FFFFFF' });

        //Particles
        this.emitter = this.add.particles(0, 0, "star",{
            speed: 240,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            frequency: -1
        });
        
    }
    

    collectSlug (player, slug)
    {   const beep = this.sound.add('blip', { loop: false });
        beep.play();
        slug.disableBody(true, true);
        
        // updates
        ++this.score;
        this.scoreBox.setText('SCORE: ' + this.score);
            this.emitter.emitParticleAt(this.player.x, this.player.y, 4);
    }

    spawnObstacle ()
    {
        let obstacle = this.obstacle.create(1750, 770, 'bird')
            .setImmovable(true)
            .setCircle(256, 0, 0);
        this.physics.add.collider(this.player, this.obstacle); 
        obstacle.setGravityY(-300).setGravityX(parseInt(this.config["objspd"])).setScale(3.5);
        obstacle.anims.play('birdfly'); // plays animation for bird
        //this.physics.add.overlap(this.player, obstacle, this.hit, null, this);

        this.time.delayedCall(Phaser.Math.Between(5000, 10000), this.spawnObstacle, [], this);
    }
    spawnTree(){
        this.tree = this.physics.add.sprite(2320, 755, 'tree')
            .setImmovable(true)
            .setGravityY(-300)
            .setVelocityX(-500)
            .setScale(2)
            this.time.delayedCall(2000, this.spawnTree, [], this);
    }

    spawnSlug ()
    {
        let slug = this.slugs.create(1000, 802, 'slug');
        slug.setGravityY(-300).setGravityX(-10).setScale(0.8);
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

        //this.loseLife();
    }

    jump ()
    {
        this.jumpSound.play();
        this.player.anims.play('jumping');
        
        if(this.player.body.touching.down)
        {
            this.player.setVelocityY(parseInt(this.config["jumpvel"]));
            console.log(this.config["jumpvel"])
            this.recenttime = this.game.getTime();
        }
        else if ((this.player.body.touching.down == false) && ((this.game.getTime() - this.recenttime) > 500) && this.player.airjump){
            this.player.airjump = false;
            this.player.setVelocityY(parseInt(this.config["jumpvel"]));
        }

        this.time.delayedCall(1500, () => {
            this.player.anims.play('running');
        });
    }   
    endGame(player, wall){
        this.scene.start('endscreen', { score: this.score })
    }
    update () 
    {   
        if(this.player.body.touching.down)
        {
            this.player.airjump = true;
        }

        this.background.tilePositionX += 1;
        if(this.physics.collide(this.player, this.obstacle) == true){
            this.player.curspeed = 0;
            this.player.setVelocityX(this.player.curspeed);
        }
        if(this.player.x < 400){
            this.player.setVelocityX(this.player.curspeed)
            this.player.curspeed+= 0.2;
        }
        else{
            this.player.curspeed = 0
            this.player.setVelocityX(this.player.curspeed)
        }
    }
}


