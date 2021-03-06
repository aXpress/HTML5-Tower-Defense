var GameOver = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameOver ()
    {
        Phaser.Scene.call(this, { key: 'GameOver' });
    },

    preload: function ()
    {
        this.load.image('imgMenuBG', 'src/assets/backgrounds/menuBG.jpg');
        this.load.image('imgMainMenuButton', 'src/assets/imgMainMenuButton.png');
        this.load.image('imgGameOverBG', 'src/assets/backgrounds/gameOverBG.jpg')
        
    },

    create: function ()
    {
        //this.add.text(20, 20, "Main Menu");
        this.add.text(150, 200, "YOU FAILED TO REPEL THE ATTACK!", {font: '52pt pixel', fill: '#fff'});
        this.add.text(600, 300, "GAME OVER", {font: '52pt pixel', fill: '#fff'});

        var mainMenuButton = this.add.sprite(800, 500, 'imgMainMenuButton').setInteractive()
        .on('pointerover', () => mainMenuButton.setTint(0xC0C0C0))
        .on('pointerout', () => mainMenuButton.clearTint())
        .on('pointerdown', () => this.scene.start('MainMenu'), this);
        var mainMenuTxt = this.add.text(753, 488, "MAIN MENU", {font: '14pt pixel', fill: '0xffffff'});

        this.background = this.add.tileSprite(0, 0, 1600, 900, "imgGameOverBG");
        this.background.setOrigin(0, 0);
        this.background.depth = -1;
    },

    update: function() {
        this.background.tilePositionX += 2;
    }
});