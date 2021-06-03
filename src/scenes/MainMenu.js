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
        this.load.image('imgMenuBG', 'src/assets/backgrounds/menuBG.png');
        this.load.image('imgMainMenuButton', 'src/assets/imgMainMenuButton.png');
        this.load.image('imgLock', 'src/assets/imgLock.png');
    },

    create: function ()
    {
        //this.add.text(20, 20, "Main Menu");
        this.add.text(490, 50, "LEVEL SELECT", {font: '64pt pixel', fill: '#fff'});

        this.background = this.add.tileSprite(0, 0, 1600, 900, "imgMenuBG");
        this.background.setOrigin(0, 0);
        this.background.depth = -1;

        // Container that can change text dynamically via below level menu functions
        var loreContainer = this.add.container(800, 690);
        var loreBox = this.add.sprite(0, 0, 'imgLevelLore');
        var loreText = this.add.text(0, -10, '', {font: '33pt pixel', fill: '#000'});
        loreText.setOrigin(0.5, 0.5);
        loreContainer.add(loreBox);
        loreContainer.add(loreText);
        
        // Menu functions for Level One box
        var selectLevelOne = this.add.sprite(350, 325, 'imgSelectLevelOne');
        var lvl1Text = this.add.text(265, 440, 'LEVEL 1', {font: '32pt pixel', fill: '#fff'});
        selectLevelOne.setInteractive().on('pointerover', function(event) {
            this.setTint(0xC0C0C0);
            loreText.setText("Monsters have come to attack our village.\nIt's time to power up the towers!");
        });
        selectLevelOne.setInteractive().on('pointerout', function(event) {
            this.clearTint();
            loreText.setText("");
        });
        selectLevelOne.setInteractive().on('pointerdown', function() {this.scene.start('LevelOne')}, this);

        // Menu functions for Level Two box
        var selectLevelTwo = this.add.sprite(800, 325, 'imgSelectLevelTwo');
        var lvl2Text = this.add.text(715, 440, 'LEVEL 2', {font: '32pt pixel', fill: '#fff'});
        var lvl2Lock = this.add.sprite(800, 325, 'imgLock');
        if(level2unlock === true) {
            lvl2Lock.setActive(false);
            lvl2Lock.setVisible(false);
            selectLevelTwo.setInteractive().on('pointerover', function(event) {
                this.setTint(0xC0C0C0);
                loreText.setText("The monsters are angry and have come for\nrevenge. Be mindful of your elemental combos!");
            });
            selectLevelTwo.setInteractive().on('pointerout', function(event) {
                this.clearTint();
                loreText.setText("");
            });
            selectLevelTwo.setInteractive().on('pointerdown', function() {this.scene.start('LevelTwo')}, this);
        }
        
        // Menu functions for Level Three box
        var selectLevelThree = this.add.sprite(1250, 325, 'imgSelectLevelThree');
        var lvl3Text = this.add.text(1165, 440, 'LEVEL 3', {font: '32pt pixel', fill: '#fff'});
        var lvl3Lock = this.add.sprite(1250, 325, 'imgLock');
        if(level3unlock === true) {
            lvl3Lock.setActive(false);
            lvl3Lock.setVisible(false);
            selectLevelThree.setInteractive().on('pointerover', function(event) {
                this.setTint(0xC0C0C0);
                loreText.setText("This is the final battle! All the monsters\nhave come to fight. This won't be easy...");
            });
            selectLevelThree.setInteractive().on('pointerout', function(event) {
                this.clearTint();
                loreText.setText("");
            });
            selectLevelThree.setInteractive().on('pointerdown', function() {this.scene.start('LevelThree')}, this);
        }
        
        // Menu functions for Custom level box
        var mapCreationBtn = this.add.sprite(100, 35, 'imgMainMenuButton').setInteractive()
        .on('pointerover', function(event) {
            mapCreationBtn.setTint(0xC0C0C0);
            loreText.setText("Create your own custom map!\n**UNDER DEVELOPMENT**");
        })
        .on('pointerout', function() {
            mapCreationBtn.clearTint()
            loreText.setText("");
        })
        .on('pointerdown', () => this.scene.start('MapCreation'), this);
        var mapCreationTxt = this.add.text(60, 20, "CUSTOM", {font: '14pt pixel', fill: '0xffffff'});

        /**
         * UNCOMMENT TO DEBUG LEVEL UNLOCK
         */
        // var unlockLvl2 = this.add.sprite(1300, 35, 'imgMainMenuButton').setInteractive()
        // .on('pointerover', function(event) {
        //     unlockLvl2.setTint(0xC0C0C0);
        //     loreText.setText("Unlock level 2 **TESTING ONLY**");
        // })
        // .on('pointerout', () => unlockLvl2.clearTint())
        // .on('pointerdown', function(){level2unlock = true});
        // var unlock2Txt = this.add.text(1255, 20, "UNLOCK 2", {font: '14pt pixel', fill: '0xffffff'});

        // var unlockLvl3 = this.add.sprite(1500, 35, 'imgMainMenuButton').setInteractive()
        // .on('pointerover', function(event) {
        //     unlockLvl3.setTint(0xC0C0C0);
        //     loreText.setText("Unlock level 3 **TESTING ONLY**");
        // })
        // .on('pointerout', () => unlockLvl3.clearTint())
        // .on('pointerdown', function(){level3unlock = true});
        // var unlock3Txt = this.add.text(1455, 20, "UNLOCK 3", {font: '14pt pixel', fill: '0xffffff'});

    },

    update: function() {
        this.background.tilePositionX += 0.75;
    }
});