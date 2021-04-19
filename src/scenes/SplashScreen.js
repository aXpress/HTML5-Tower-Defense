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
    },

    create: function ()
    {
        this.add.text(20, 20, "Splash");
        this.add.text(605, 200, "PENDING TITLE TD", {font: '32pt Arial', fill: '#fff'});

        var startButton = this.add.sprite(800, 450, 'imgStartButton');
        startButton.setInteractive().on('pointerover', function(event) {this.setTint(0xC0C0C0);});
        startButton.setInteractive().on('pointerout', function(event) {this.clearTint();});
        startButton.setInteractive().on('pointerdown', function() {this.scene.start('MainMenu')}, this);
    }
});