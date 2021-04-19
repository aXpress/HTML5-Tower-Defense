var LevelThree = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function LevelThree ()
    {
        Phaser.Scene.call(this, { key: 'LevelThree' });
    },

    preload: function ()
    {
    },

    create: function ()
    {
        this.add.text(20, 20, "Level Three");

        var mainMenuButton = this.add.sprite(1500, 50, 'imgMainMenuButton');
        mainMenuButton.setInteractive().on('pointerover', function(event) {this.setTint(0xC0C0C0);});
        mainMenuButton.setInteractive().on('pointerout', function(event) {this.clearTint();});
        mainMenuButton.setInteractive().on('pointerdown', function() {this.scene.start('MainMenu')}, this);
    }

});