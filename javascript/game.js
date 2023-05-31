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
        this.treespawn = false;
    }

    update () 
    {
        super.update();
        //Moving trees as background objects, same way of code for the obstacles we'll add
        if(((this.game.getTime() % 2000) >= 1800) && (this.treespawn == false)){
            this.physics.add.sprite(2320, 181, 'tree')
                .setImmovable(true)
                .setGravityY(-300)
                .setGravityX(-100)
                
            this.treespawn = true;
        }
        if((this.game.getTime() % 2000) < 1800){
            this.treespawn = false;
        }
    }
}

let config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },

    scene: [SceneOne],
    title: "Temp Name",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: true
        }
    },
}

const game = new Phaser.Game(config);