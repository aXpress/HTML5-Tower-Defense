var Victory = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Victory ()
    {
        Phaser.Scene.call(this, { key: 'Victory' });
    },

    preload: function ()
    {
        this.load.image('imgMenuBG', 'src/assets/backgrounds/menuBG.jpg');
        this.load.image('imgMainMenuButton', 'src/assets/imgMainMenuButton.png');
        this.load.image('imgVictoryBG', 'src/assets/backgrounds/victoryBG.jpg')
        
    },

    create: function ()
    {
        //this.add.text(20, 20, "Main Menu");
        this.add.text(125, 200, "YOU SUCCESSFULLY REPELLED THE ATTACK!", {font: '45pt pixel', fill: '#fff'});
        this.add.text(475, 300, "CONGRATULATIONS!", {font: '45pt pixel', fill: '#fff'});

        var mainMenuButton = this.add.sprite(800, 500, 'imgMainMenuButton').setInteractive()
        .on('pointerover', () => mainMenuButton.setTint(0xC0C0C0))
        .on('pointerout', () => mainMenuButton.clearTint())
        .on('pointerdown', () => this.scene.start('MainMenu'), this);
        var mainMenuTxt = this.add.text(753, 488, "MAIN MENU", {font: '14pt pixel', fill: '0xffffff'});

        this.background = this.add.tileSprite(0, 0, 1600, 900, "imgVictoryBG");
        this.background.setOrigin(0, 0);
        this.background.depth = -1;
    },

    update: function() {
        this.background.tilePositionX -= 2;
    }
});