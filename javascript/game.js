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

    scene: [SceneOne, endScreen],
    title: "Temp Name",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            //debug: true
        }
    },
}

const game = new Phaser.Game(config);