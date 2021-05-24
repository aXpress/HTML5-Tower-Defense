var path;

var LevelThree = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function LevelThree ()
    {
        Phaser.Scene.call(this, { key: 'LevelThree' });
    },

    preload: function ()
    {
        this.load.image('imgMainMenuButton', 'src/assets/imgMainMenuButton.png');
        this.load.image('wraithEnemy', 'src/assets/enemies/wraith.png');
    },

    create: function ()
    {
        this.add.text(20, 20, "Level Three");

        var mainMenuButton = this.add.sprite(1500, 50, 'imgMainMenuButton');
        mainMenuButton.setInteractive().on('pointerover', function(event) {this.setTint(0xC0C0C0);});
        mainMenuButton.setInteractive().on('pointerout', function(event) {this.clearTint();});
        mainMenuButton.setInteractive().on('pointerdown', function() {this.scene.start('MainMenu')}, this);

        // this graphics element is only for visualization, 
        // its not related to our path
        var graphics = this.add.graphics();    
        
        // the path for our enemies
        // parameters are the start x and y of our path
        path = this.add.path(96, -32);
        path.lineTo(96, 164);
        path.lineTo(480, 164);
        path.lineTo(480, 544);
        
        graphics.lineStyle(3, 0xffffff, 1);
        // visualize the path
        path.draw(graphics);
    }

});

var Enemy = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('wraithEnemy');
        this.hp = 100;

    },
    update: function (time, delta)
    {
        
    }

});