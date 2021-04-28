//const { container } = require("webpack");

var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainMenu ()
    {
        Phaser.Scene.call(this, { key: 'MainMenu' });
    },

    preload: function ()
    {
        this.load.image('imgSelectLevelOne', 'src/assets/imgSelectLevelOne.png');
        this.load.image('imgSelectLevelTwo', 'src/assets/imgSelectLevelTwo.png');
        this.load.image('imgSelectLevelThree', 'src/assets/imgSelectLevelThree.png');
        this.load.image('imgLevelLore', 'src/assets/imgLevelLore.png');
    },

    create: function ()
    {
        this.add.text(20, 20, "Main Menu");
        this.add.text(620, 75, "LEVEL SELECT", {font: '32pt Arial', fill: '#fff'});

        // Container that can change text dynamically via below level menu functions
        var loreContainer = this.add.container(800, 675);
        var loreBox = this.add.sprite(0, 0, 'imgLevelLore');
        var loreText = this.add.text(0, 0, '', {font: '32pt Arial', fill: '0xffffff'});
        loreText.setOrigin(0.5, 0.5);
        loreContainer.add(loreBox);
        loreContainer.add(loreText);
        
        // Menu functions for Level One box
        var selectLevelOne = this.add.sprite(300, 325, 'imgSelectLevelOne');
        selectLevelOne.setInteractive().on('pointerover', function(event) {
            this.setTint(0xC0C0C0);
            loreText.setText("This is where level one's text will be");
        });
        selectLevelOne.setInteractive().on('pointerout', function(event) {
            this.clearTint();
            loreText.setText("");
        });
        selectLevelOne.setInteractive().on('pointerdown', function() {this.scene.start('MapCreation')}, this);

        // Menu functions for Level Two box
        var selectLevelTwo = this.add.sprite(800, 325, 'imgSelectLevelTwo');
        selectLevelTwo.setInteractive().on('pointerover', function(event) {
            this.setTint(0xC0C0C0);
            loreText.setText("This is where level two's text will be");
        });
        selectLevelTwo.setInteractive().on('pointerout', function(event) {
            this.clearTint();
            loreText.setText("");
        });
        selectLevelTwo.setInteractive().on('pointerdown', function() {this.scene.start('LevelTwo')}, this);

        // Menu functions for Level Three box
        var selectLevelThree = this.add.sprite(1300, 325, 'imgSelectLevelThree');
        selectLevelThree.setInteractive().on('pointerover', function(event) {
            this.setTint(0xC0C0C0);
            loreText.setText("This is where level three's text will be");
        });
        selectLevelThree.setInteractive().on('pointerout', function(event) {
            this.clearTint();
            loreText.setText("");
        });
        selectLevelThree.setInteractive().on('pointerdown', function() {this.scene.start('LevelThree')}, this);
    }

});