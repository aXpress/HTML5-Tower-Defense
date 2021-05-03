//import { MainMenuButton } from '../script/MainMenuButton';

class LevelTwo extends Phaser.Scene{
    constructor(){
        super('LevelTwo');
    }
    preload() {
        this.load.image('imgMainMenuButton', 'src/assets/imgMainMenuButton.png');
    }
    create() {
        this.add.text(20, 20, "Level Two");
        this.add.text(20, 35, "curBut: ");
        var currentBtn = this.add.text(100, 35, "None");
        var curBut ='';

        //let imgMainMenuButton = new MainMenuButton({scene: this, x: 100, y: 100})
        //var mainMenuButton = new MainMenuButton({scene: this});
        var mainMenuButton = this.add.sprite(1500, 50, 'imgMainMenuButton').setInteractive()
        .on('pointerover', () => mainMenuButton.setTint(0xC0C0C0))
        .on('pointerout', () => mainMenuButton.clearTint())
        .on('pointerdown', () => this.scene.start('MainMenu'), this);

        // Tower selection container
        var towerContainer = this.add.container(400,800);
        
        var fireTowerBtn = this.add.rectangle(0, 0, 150, 35, 0xff0000);
        var fireBtnTxt = this.add.text(0, 0, "Fire",{font: '18pt Arial', fill: '0xff0000'});
        fireBtnTxt.setOrigin(0.5,0.5);
        fireTowerBtn.setStrokeStyle(5,0xff0000);
        fireTowerBtn.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        fireTowerBtn.setInteractive().on('pointerout', function(event) {this.setFillStyle(0xff0000, 1);});
        fireTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'fireTower';
            currentBtn.setText('fireTower');
        });

        var waterTowerBtn = this.add.rectangle(200, 0, 150, 35, 0x00AAFF);
        var waterBtnTxt = this.add.text(200, 0, "Water",{font: '18pt Arial', fill: '0xffffff'});
        waterBtnTxt.setOrigin(0.5,0.5);
        waterTowerBtn.setStrokeStyle(5,0xff0000);
        waterTowerBtn.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        waterTowerBtn.setInteractive().on('pointerout', function(event) {this.setFillStyle(0x00AAFF, 1);});
        waterTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'waterTower';
            currentBtn.setText('waterTower');
        });

        var windTowerBtn = this.add.rectangle(400, 0, 150, 35, 0x00C40C);
        var windBtnTxt = this.add.text(400, 0, "Wind",{font: '18pt Arial', fill: '0xffffff'});
        windBtnTxt.setOrigin(0.5,0.5);
        windTowerBtn.setStrokeStyle(5,0xff0000);
        windTowerBtn.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        windTowerBtn.setInteractive().on('pointerout', function(event) {this.setFillStyle(0x00C40C, 1);});
        windTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'windTower';
            currentBtn.setText('windTower');
        });

        var elecTowerBtn = this.add.rectangle(600, 0, 150, 35, 0xFFD800);
        var elecBtnTxt = this.add.text(600, 0, "Electric",{font: '18pt Arial', fill: '0xffffff'});
        elecBtnTxt.setOrigin(0.5,0.5);
        elecTowerBtn.setStrokeStyle(5,0xff0000);
        elecTowerBtn.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        elecTowerBtn.setInteractive().on('pointerout', function(event) {this.setFillStyle(0xFFD800, 1);});
        elecTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'elecTower';
            currentBtn.setText('elecTower');
        });

        var iceTowerBtn = this.add.rectangle(800, 0, 150, 35, 0x8AFFFD);
        var iceBtnTxt = this.add.text(800, 0, "Ice",{font: '18pt Arial', fill: '0xffffff'});
        iceBtnTxt.setOrigin(0.5,0.5);
        iceTowerBtn.setStrokeStyle(5,0xff0000);
        iceTowerBtn.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        iceTowerBtn.setInteractive().on('pointerout', function(event) {this.setFillStyle(0x8AFFFD, 1);});
        iceTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'iceTower';
            currentBtn.setText('iceTower');
        });

        towerContainer.add(fireTowerBtn);
        towerContainer.add(fireBtnTxt);
        towerContainer.add(waterTowerBtn);
        towerContainer.add(waterBtnTxt);
        towerContainer.add(windTowerBtn);
        towerContainer.add(windBtnTxt);
        towerContainer.add(elecTowerBtn);
        towerContainer.add(elecBtnTxt);
        towerContainer.add(iceTowerBtn);
        towerContainer.add(iceBtnTxt);

        this.input.on('pointerdown', function (pointer, gameObjects) {
            if(curBut == 'fireTower') {
                if(gameObjects.length > 0) {
                    return;
                }
                this.scene.add.rectangle(pointer.x, pointer.y, 50, 50, 0xFF0000).setInteractive();
            }
            if(curBut == 'waterTower') {
                if(gameObjects.length > 0) {
                    return;
                }
                this.scene.add.rectangle(pointer.x, pointer.y, 50, 50, 0x00AAFF).setInteractive();
            }
            if(curBut == 'windTower') {
                if(gameObjects.length > 0) {
                    return;
                }
                this.scene.add.rectangle(pointer.x, pointer.y, 50, 50, 0x00C40C).setInteractive();
            }
            if(curBut == 'elecTower') {
                if(gameObjects.length > 0) {
                    return;
                }
                this.scene.add.rectangle(pointer.x, pointer.y, 50, 50, 0xFFD800).setInteractive();
            }
            if(curBut == 'iceTower') {
                if(gameObjects.length > 0) {
                    return;
                }
                this.scene.add.rectangle(pointer.x, pointer.y, 50, 50, 0x8AFFFD).setInteractive();
            }
        });
    
        
    }
    update(){
    }
}