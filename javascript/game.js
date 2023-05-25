class SceneOne extends Prefab
{
    constructor ()
    {
        // disables gravity just for scene 1 - possible hub world able to move freely
        super({
            key: 'sceneone',
            physics: {
              default: 'arcade',
              arcade: { 
                gravity: { y: 0 }
              }
            }
          });
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
            gravity: {y: 300}
        }
    }
}

const game = new Phaser.Game(config);