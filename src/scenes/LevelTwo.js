//import { MainMenuButton } from '../script/MainMenuButton';
var fireTowers;
var waterTowers;
var windTowers;
var iceTowers;
var elecTowers;
var curBut = 'None';

var enemies;

var ENEMY_SPEED = 1/10000;
var path;

var LevelTwo = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function LevelTwo() {
        Phaser.Scene.call(this, { key: 'LevelTwo' });
    },

    preload: function() {
        this.load.image('imgMainMenuButton', 'src/assets/imgMainMenuButton.png');
        this.load.image('imgFireTower', 'src/assets/towers/fireTower.png');
        this.load.image('imgWaterTower', 'src/assets/towers/waterTower.png');
        this.load.image('imgWindTower', 'src/assets/towers/windTower.png');
        this.load.image('imgIceTower', 'src/assets/towers/iceTower.png');
        this.load.image('imgElecTower', 'src/assets/towers/elecTower.png');
        this.load.image('wraithEnemy', 'src/assets/enemies/wraith0.png')
    },

    create: function() {
        this.add.text(20, 20, "Level Two");
        this.add.text(20, 35, "curBut: ");
        var currentBtn = this.add.text(100, 35, "None");

        var mainMenuButton = this.add.sprite(1500, 50, 'imgMainMenuButton').setInteractive()
            .on('pointerover', () => mainMenuButton.setTint(0xC0C0C0))
            .on('pointerout', () => mainMenuButton.clearTint())
            .on('pointerdown', () => this.scene.start('MainMenu'), this);
        
        
        // this graphics element is only for visualization, 
        // its not related to our path
        var graphics = this.add.graphics();    
        
        // the path for our enemies
        // parameters are the start x and y of our path
        path = this.add.path(0, 450);
        path.lineTo(450, 450);
        path.lineTo(900, 450);
        path.lineTo(1600, 450);
        
        graphics.lineStyle(3, 0xffffff, 1);
        // visualize the path
        path.draw(graphics);

        // Tower selection container
        var towerContainer = this.add.container(400, 800);

        var fireTowerBtn = this.add.rectangle(0, 0, 150, 35, 0xff0000);
        var fireBtnTxt = this.add.text(0, 0, "Fire", { font: '18pt Arial', fill: '0xff0000' });
        fireBtnTxt.setOrigin(0.5, 0.5);
        fireTowerBtn.setStrokeStyle(5, 0xff0000);
        fireTowerBtn.setInteractive().on('pointerover', function(event) { this.setFillStyle(0xffffff, .75); });
        fireTowerBtn.setInteractive().on('pointerout', function(event) { this.setFillStyle(0xff0000, 1); });
        fireTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'fireTower';
            currentBtn.setText('fireTower');
        });

        var waterTowerBtn = this.add.rectangle(200, 0, 150, 35, 0x00AAFF);
        var waterBtnTxt = this.add.text(200, 0, "Water", { font: '18pt Arial', fill: '0xffffff' });
        waterBtnTxt.setOrigin(0.5, 0.5);
        waterTowerBtn.setStrokeStyle(5, 0xff0000);
        waterTowerBtn.setInteractive().on('pointerover', function(event) { this.setFillStyle(0xffffff, .75); });
        waterTowerBtn.setInteractive().on('pointerout', function(event) { this.setFillStyle(0x00AAFF, 1); });
        waterTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'waterTower';
            currentBtn.setText('waterTower');
        });

        var windTowerBtn = this.add.rectangle(400, 0, 150, 35, 0x00C40C);
        var windBtnTxt = this.add.text(400, 0, "Wind", { font: '18pt Arial', fill: '0xffffff' });
        windBtnTxt.setOrigin(0.5, 0.5);
        windTowerBtn.setStrokeStyle(5, 0xff0000);
        windTowerBtn.setInteractive().on('pointerover', function(event) { this.setFillStyle(0xffffff, .75); });
        windTowerBtn.setInteractive().on('pointerout', function(event) { this.setFillStyle(0x00C40C, 1); });
        windTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'windTower';
            currentBtn.setText('windTower');
        });

        var elecTowerBtn = this.add.rectangle(600, 0, 150, 35, 0xFFD800);
        var elecBtnTxt = this.add.text(600, 0, "Electric", { font: '18pt Arial', fill: '0xffffff' });
        elecBtnTxt.setOrigin(0.5, 0.5);
        elecTowerBtn.setStrokeStyle(5, 0xff0000);
        elecTowerBtn.setInteractive().on('pointerover', function(event) { this.setFillStyle(0xffffff, .75); });
        elecTowerBtn.setInteractive().on('pointerout', function(event) { this.setFillStyle(0xFFD800, 1); });
        elecTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'elecTower';
            currentBtn.setText('elecTower');
        });

        var iceTowerBtn = this.add.rectangle(800, 0, 150, 35, 0x8AFFFD);
        var iceBtnTxt = this.add.text(800, 0, "Ice", { font: '18pt Arial', fill: '0xffffff' });
        iceBtnTxt.setOrigin(0.5, 0.5);
        iceTowerBtn.setStrokeStyle(5, 0xff0000);
        iceTowerBtn.setInteractive().on('pointerover', function(event) { this.setFillStyle(0xffffff, .75); });
        iceTowerBtn.setInteractive().on('pointerout', function(event) { this.setFillStyle(0x8AFFFD, 1); });
        iceTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'iceTower';
            currentBtn.setText('iceTower');
        });

        var noneBtn = this.add.rectangle(1000, 0, 150, 35, 0x8AFFFD);
        var noneBtnTxt = this.add.text(1000, 0, "None", { font: '18pt Arial', fill: '0xffffff' });
        noneBtnTxt.setOrigin(0.5, 0.5);
        noneBtn.setStrokeStyle(5, 0xff0000);
        noneBtn.setInteractive().on('pointerover', function(event) { this.setFillStyle(0xffffff, .75); });
        noneBtn.setInteractive().on('pointerout', function(event) { this.setFillStyle(0x8AFFFD, 1); });
        noneBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'None';
            currentBtn.setText('None');
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
        towerContainer.add(noneBtn);
        towerContainer.add(noneBtnTxt);

        fireTowers = this.add.group({ classType: FireTower, runChildUpdate: true });
        waterTowers = this.add.group({ classType: WaterTower, runChildUpdate: true });
        windTowers = this.add.group({ classType: WindTower, runChildUpdate: true });
        iceTowers = this.add.group({ classType: IceTower, runChildUpdate: true });
        elecTowers = this.add.group({ classType: ElecTower, runChildUpdate: true });
        var fireCursor = this.add.image(0, 0, 'imgFireTower').setVisible(false);
        var waterCursor = this.add.image(0, 0, 'imgWaterTower').setVisible(false);
        var windCursor = this.add.image(0, 0, 'imgWindTower').setVisible(false);
        var iceCursor = this.add.image(0, 0, 'imgIceTower').setVisible(false);
        var elecCursor = this.add.image(0, 0, 'imgElecTower').setVisible(false);
        enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });

        this.input.on('pointerdown', function(pointer, gameObjects) {
            if (curBut == 'None' || gameObjects.length > 0) {
                return;
            } else if (curBut == 'fireTower') {
                var fireTower = fireTowers.get();
                fireTower.place(pointer.y, pointer.x);
            } else if (curBut == 'waterTower') {
                var waterTower = waterTowers.get();
                waterTower.place(pointer.y, pointer.x);
            } else if (curBut == 'windTower') {
                var windTower = windTowers.get();
                windTower.place(pointer.y, pointer.x);
            } else if (curBut == 'iceTower') {
                var iceTower = iceTowers.get();
                iceTower.place(pointer.y, pointer.x);
            } else if (curBut == 'elecTower') {
                var elecTower = elecTowers.get();
                elecTower.place(pointer.y, pointer.x);
            }
        });

        this.input.on('pointermove', function(pointer) {
            if (curBut == 'fireTower') {
                fireCursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y);
                waterCursor.setVisible(false);
                windCursor.setVisible(false);
                iceCursor.setVisible(false);
                elecCursor.setVisible(false);
            } else if (curBut == 'waterTower') {
                waterCursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y);
                fireCursor.setVisible(false);
                windCursor.setVisible(false);
                iceCursor.setVisible(false);
                elecCursor.setVisible(false);
            } else if (curBut == 'windTower') {
                windCursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y);
                fireCursor.setVisible(false);
                waterCursor.setVisible(false);
                iceCursor.setVisible(false);
                elecCursor.setVisible(false);
            } else if (curBut == 'iceTower') {
                iceCursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y);
                fireCursor.setVisible(false);
                waterCursor.setVisible(false);
                windCursor.setVisible(false);
                elecCursor.setVisible(false);
            } else if (curBut == 'elecTower') {
                elecCursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y);
                fireCursor.setVisible(false);
                waterCursor.setVisible(false);
                windCursor.setVisible(false);
            } else {
                fireCursor.setVisible(false);
                waterCursor.setVisible(false);
                windCursor.setVisible(false);
                iceCursor.setVisible(false);
                elecCursor.setVisible(false);
            }
        })
        
    },

    update: function() {
        if (time > this.nextEnemy) {
            var enemy = enemies.get();
            if (enemy) {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 2000;
            }
        }
    },

    // placeTower: function(pointer, gameObjects) {
    //     var fireTower = fireTowers.get();
    //     if (curBut == 'None') {
    //         return;
    //     }
    //     else if(curBut == 'fireTower') {
    //         if(gameObjects.length > 0) {
    //             return;
    //         }
    //         this.scene.add.rectangle(pointer.x, pointer.y, 50, 50, 0xFF0000).setInteractive();
    //         fireTower.place(pointer.y, pointer.x);
    //     }
    // }
})

var FireTower = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize:

        function FireTower(scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgFireTower');
        this.setPosition(x, y);
    },

    place: function(i, j) {
        this.y = i;
        this.x = j;
    }
});

var WaterTower = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize:

        function FireTower(scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgWaterTower');
        this.setPosition(x, y);
    },

    place: function(i, j) {
        this.y = i;
        this.x = j;
    }
});

var WindTower = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize:

        function FireTower(scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgWindTower');
        this.setPosition(x, y);
    },

    place: function(i, j) {
        this.y = i;
        this.x = j;
    }
});

var IceTower = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize:

        function FireTower(scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgIceTower');
        this.setPosition(x, y);
    },

    place: function(i, j) {
        this.y = i;
        this.x = j;
    }
});

var ElecTower = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize:

        function FireTower(scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgElecTower');
        this.setPosition(x, y);
    },

    place: function(i, j) {
        this.y = i;
        this.x = j;
    }
});

var Enemy = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Enemy(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('wraithEnemy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
    },

    startOnPath: function() {
        this.follower.t = 0;
        this.hp = 100;

        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    },

    update: function(time, delta) {
        this.follower.t += ENEMY_SPEED * delta;
        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        if (this.follower.t >= 1) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});

function getEnemy(x, y, distance) {
    var enemyUnits = enemies.getChildren();
    for (var i = 0; i < enemyUnits.length; i++) {
        if (enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
}
