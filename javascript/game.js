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
    }

    update () 
    {
        super.update();
    }
}

let config = {
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        //width: 1920,
        //height: 1080,
    },

    scene: [SceneOne],
    title: "Temp Name",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300}
        }
    }
}

const game = new Phaser.Game(config);