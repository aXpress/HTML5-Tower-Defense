class MainMenuButton extends Phaser.GameObjects.Sprite {
    constructor(scene){
        super(scene, config.x, config.y, 'mainMenuButton');
        scene.add.existing(this);
        // this.setInteractive()
        // .on('pointerover', () => this.setTint(0xC0C0C0), this)
        // .on('pointerout', () => this.clearTint(), this)
        // .on('pointerdown', () => {this.scene.start('MainMenu')}, this);
    }
}