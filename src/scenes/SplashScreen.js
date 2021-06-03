var SplashScreen = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SplashScreen ()
    {
        Phaser.Scene.call(this, { key: 'SplashScreen' });
    },

    preload: function ()
    {
        this.load.image('imgStartButton', 'src/assets/imgStartButton.png');
        this.load.image('imgSplashBG', 'src/assets/backgrounds/splashBG.jpg');
    },

    create: function ()
    {
        this.add.text(550, 225, "ELEMENT JS TD", {font: '64px pixel', fill: '#000000'});
        
        level2unlock = true;
        level3unlock = true;

        //this.background = this.add.tileSprite(0,0, config.width, config.height, "imgBackground");
        this.background = this.add.tileSprite(0, 0, 1600, 900, "imgSplashBG");
        this.background.setOrigin(0, 0);
        this.background.depth = -1;

        var startButton = this.add.sprite(800, 450, 'imgStartButton').setScale(1.5);
        var startText = this.add.text(758, 435, "START", {font: "24px pixel", fill: '000000'});
        startButton.setInteractive().on('pointerover', function(event) {this.setTint(0xC0C0C0);});
        startButton.setInteractive().on('pointerout', function(event) {this.clearTint();});
        startButton.setInteractive().on('pointerdown', function() {this.scene.start('LevelThree')}, this);

    },

    update: function() {
        this.background.tilePositionX -= 0.75;
    }
});