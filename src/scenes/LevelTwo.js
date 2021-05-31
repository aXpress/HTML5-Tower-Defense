var fireTowers;
var waterTowers;
var windTowers;
var iceTowers;
var elecTowers;
var enemies;
var enemies2;
var enemies3;
var bullets;
var curBut ='None';

var goldText;
var gameGold = 10;
var livesText;
var lives = 10;
var waveText;

var FIRECOST = 3;
var WATERCOST = 4;
var WINDCOST = 15;
var ICECOST = 9;
var ELECCOST = 6;

var path;

var wave1 = 5;
var wave2 = 10;
var wave3 = 15;

var LevelTwo = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

    function LevelTwo ()
    {
        Phaser.Scene.call(this, { key: 'LevelTwo' });
    },
    
    preload: function() {
        this.load.image('imgMainMenuButton', 'src/assets/imgMainMenuButton.png');
        this.load.image('imgFireTower', 'src/assets/towers/fireTower.png');
        this.load.image('imgWaterTower', 'src/assets/towers/waterTower.png');
        this.load.image('imgWindTower', 'src/assets/towers/windTower.png');
        this.load.image('imgIceTower', 'src/assets/towers/iceTower.png');
        this.load.image('imgElecTower', 'src/assets/towers/elecTower.png');
        this.load.image('imgEnemy', 'src/assets/towers/enemy.png');
        this.load.image('imgFireBullet', 'src/assets/bullets/fireBullet.png');
        this.load.image('imgWaterBullet', 'src/assets/bullets/waterBullet.png');
        this.load.image('imgWindBullet', 'src/assets/bullets/windBullet.png');
        this.load.image('imgIceBullet', 'src/assets/bullets/iceBullet.png');
        this.load.image('imgElecBullet', 'src/assets/bullets/elecBullet.png');
        this.load.image('imgBottomUI', 'src/assets/imgBottomUI.png');
        this.load.image('imgGameStatsBG', 'src/assets/imgGameStatsBG.png');
        this.load.image('imgTowerStatsBG', 'src/assets/imgTowerStatsBG.png');
        this.load.image('imgUpgrade', 'src/assets/imgUpgrade.png');
        this.load.image('imgSell', 'src/assets/imgSell.png');
        this.load.image('wraithEnemy', 'src/assets/enemies/wraith.png');
        this.load.image('golemEnemy', 'src/assets/enemies/golem.png');
        this.load.image('minotaurEnemy', 'src/assets/enemies/minotaur.png');
    },

    create: function() {
        //this.add.text(20, 20, "Level Two");
        gameGold = 10;
        this.add.text(20, 35, "curBut: ");
        var currentBtn = this.add.text(100, 35, "None");

        var mainMenuButton = this.add.sprite(1500, 50, 'imgMainMenuButton').setInteractive()
        .on('pointerover', () => mainMenuButton.setTint(0xC0C0C0))
        .on('pointerout', () => mainMenuButton.clearTint())
        .on('pointerdown', () => this.scene.start('MainMenu'), this);

        var bottomUI = this.add.sprite(950, 825, 'imgBottomUI').setInteractive();
        bottomUI.depth = -1;
        
        // Game stats container
        var gameStatsBG = this.add.sprite(150, 75, 'imgGameStatsBG').setInteractive();
        gameStatsBG.depth = -1;
        goldText = this.add.text(45, 25, "GOLD : " + gameGold, {font: '14pt pixel', fill: '0xffffff'});
        livesText = this.add.text(45, 60, "LIVES : 10",{font: '14pt pixel', fill: '0xffffff'});
        waveText = this.add.text(45, 95, "WAVE : 1",{font: '14pt pixel', fill: '0xffffff'});
        var gameStatsCtn = this.add.container(0, 0);
        gameStatsCtn.add(gameStatsBG);
        gameStatsCtn.add(goldText);
        gameStatsCtn.add(livesText);
        gameStatsCtn.add(waveText);

        var towerStatsCtn = this.add.container(150,825);
        var towerStatsBG = this.add.sprite(0, 0, 'imgTowerStatsBG').setInteractive();
        var upgradeButton = this.add.sprite(-115, 45, 'imgUpgrade').setInteractive()
        .on('pointerover', () => upgradeButton.setTint(0xC0C0C0))
        .on('pointerout', () => upgradeButton.clearTint());
        var upgradeText = this.add.text(-100, 32, "UPGRADE", {font: '14pt pixel', fill: '0xffffff'});
        var sellButton = this.add.sprite(40, 45, 'imgSell').setInteractive()
        .on('pointerover', () => sellButton.setTint(0xC0C0C0))
        .on('pointerout', () => sellButton.clearTint());
        var sellText = this.add.text(60, 32, "SELL", {font: '14pt pixel', fill: '0xffffff'});
        var statsTitle = this.add.text(-115, -60, "SELECTED TOWER", {font: '15pt pixel', fill: '0xffffff'});
        var towerName = this.add.text(-115, -38, "TYPE: ", {font: '15pt pixel', fill: '0xffffff'});
        var towerLevel = this.add.text(-115, -18, "LEVEL: ", {font: '15pt pixel', fill: '0xffffff'});
        var towerDamage = this.add.text(-115, 2, "DAMAGE: ", {font: '15pt pixel', fill: '0xffffff'});
        towerStatsCtn.add(towerStatsBG);
        towerStatsCtn.add(statsTitle);
        towerStatsCtn.add(towerName);
        towerStatsCtn.add(towerLevel);
        towerStatsCtn.add(towerDamage);
        towerStatsCtn.add(upgradeButton);
        towerStatsCtn.add(sellButton);
        towerStatsCtn.add(upgradeText);
        towerStatsCtn.add(sellText);

        // this graphics element is only for visualization, 
        // its not related to our path
        var graphics = this.add.graphics();    
        
        // the path for our enemies
        // parameters are the start x and y of our path
        path = this.add.path(0, 450);
        path.lineTo(450, 450);
        path.lineTo(450, 600);
        path.lineTo(1600, 600);
        
        graphics.lineStyle(10, 0xffffff, 1);
        // visualize the path
        path.draw(graphics);

        // Tower selection container
        var towerContainer = this.add.container(450, 850);
        var fireTowerBtn = this.add.rectangle(0, 0, 150, 35, 0xff0000);
        var fireBtnTxt = this.add.text(0, 0, "Fire",{font: '18pt pixel', fill: '0xff0000'});
        fireBtnTxt.setOrigin(0.5,0.5);
        fireTowerBtn.setStrokeStyle(5,0xff0000);
        fireTowerBtn.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        fireTowerBtn.setInteractive().on('pointerout', function(event) {this.setFillStyle(0xff0000, 1);});
        fireTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'fireTower';
            currentBtn.setText('fireTower');
        });

        var waterTowerBtn = this.add.rectangle(200, 0, 150, 35, 0x00AAFF);
        var waterBtnTxt = this.add.text(200, 0, "Water",{font: '18pt pixel', fill: '0xffffff'});
        waterBtnTxt.setOrigin(0.5,0.5);
        waterTowerBtn.setStrokeStyle(5,0xff0000);
        waterTowerBtn.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        waterTowerBtn.setInteractive().on('pointerout', function(event) {this.setFillStyle(0x00AAFF, 1);});
        waterTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'waterTower';
            currentBtn.setText('waterTower');
        });

        var windTowerBtn = this.add.rectangle(400, 0, 150, 35, 0x00C40C);
        var windBtnTxt = this.add.text(400, 0, "Wind",{font: '18pt pixel', fill: '0xffffff'});
        windBtnTxt.setOrigin(0.5,0.5);
        windTowerBtn.setStrokeStyle(5,0xff0000);
        windTowerBtn.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        windTowerBtn.setInteractive().on('pointerout', function(event) {this.setFillStyle(0x00C40C, 1);});
        windTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'windTower';
            currentBtn.setText('windTower');
        });

        var elecTowerBtn = this.add.rectangle(600, 0, 150, 35, 0xFFD800);
        var elecBtnTxt = this.add.text(600, 0, "Electric",{font: '18pt pixel', fill: '0xffffff'});
        elecBtnTxt.setOrigin(0.5,0.5);
        elecTowerBtn.setStrokeStyle(5,0xff0000);
        elecTowerBtn.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        elecTowerBtn.setInteractive().on('pointerout', function(event) {this.setFillStyle(0xFFD800, 1);});
        elecTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'elecTower';
            currentBtn.setText('elecTower');
        });

        var iceTowerBtn = this.add.rectangle(800, 0, 150, 35, 0x8AFFFD);
        var iceBtnTxt = this.add.text(800, 0, "Ice",{font: '18pt pixel', fill: '0xffffff'});
        iceBtnTxt.setOrigin(0.5,0.5);
        iceTowerBtn.setStrokeStyle(5,0xff0000);
        iceTowerBtn.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        iceTowerBtn.setInteractive().on('pointerout', function(event) {this.setFillStyle(0x8AFFFD, 1);});
        iceTowerBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'iceTower';
            currentBtn.setText('iceTower');
        });

        var noneBtn = this.add.rectangle(1000, 0, 150, 35, 0xFFFFFF);
        var noneBtnTxt = this.add.text(1000, 0, "None",{font: '18pt pixel', fill: '0xffffff'});
        noneBtnTxt.setOrigin(0.5,0.5);
        noneBtn.setStrokeStyle(5,0xff0000);
        noneBtn.setInteractive().on('pointerover', function(event) {this.setFillStyle(0x000000, .75);});
        noneBtn.setInteractive().on('pointerout', function(event) {this.setFillStyle(0xffffff, 1);});
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

        fireTowers = this.add.group({classType: FireTower, runChildUpdate: true});
        waterTowers = this.add.group({classType: WaterTower, runChildUpdate: true});
        windTowers = this.add.group({classType: WindTower, runChildUpdate: true});
        iceTowers = this.add.group({classType: IceTower, runChildUpdate: true});
        elecTowers = this.add.group({classType: ElecTower, runChildUpdate: true});
        enemies = this.physics.add.group({classType: Enemy, runChildUpdate: true});
        enemies2 = this.physics.add.group({classType: Enemy2, runChildUpdate: true});
        enemies3 = this.physics.add.group({classType: Enemy3, runChildUpdate: true});
        var fireCursor = this.add.image(0, 0, 'imgFireTower').setVisible(false);
        var waterCursor = this.add.image(0, 0, 'imgWaterTower').setVisible(false);
        var windCursor = this.add.image(0, 0, 'imgWindTower').setVisible(false);
        var iceCursor = this.add.image(0, 0, 'imgIceTower').setVisible(false);
        var elecCursor = this.add.image(0, 0, 'imgElecTower').setVisible(false);

        this.nextEnemy = 0;

        this.input.on('pointerdown', function (pointer, gameObjects) {
            if(curBut == 'None' || gameObjects.length > 0) {
                return;
            }
            else if (curBut == 'fireTower' && (gameGold - FIRECOST >= 0)) {
                var fireTower = fireTowers.get();
                fireTower.place(pointer.x, pointer.y);
                fireTower.setInteractive().on('pointerdown', function () {
                    upgradeButton.off('pointerdown');
                    sellButton.off('pointerdown');
                    
                    towerName.setText("TYPE: " + fireTower.element);
                    towerLevel.setText("LEVEL: " + fireTower.level);
                    towerDamage.setText("DAMAGE: " + fireTower.dmg);
                    upgradeText.setText("UPGRADE(" + fireTower.upgradeCost + ")");
                    sellText.setText("SELL(" + fireTower.sellVal + ")");

                    upgradeButton.on('pointerdown', function() {
                        if(gameGold - fireTower.upgradeCost >= 0) {
                            fireTower.upgrade()
                            towerName.setText("TYPE: " + fireTower.element);
                            towerLevel.setText("LEVEL: " + fireTower.level);
                            towerDamage.setText("DAMAGE: " + fireTower.dmg);
                            upgradeText.setText("UPGRADE(" + fireTower.upgradeCost + ")");
                            sellText.setText("SELL(" + fireTower.sellVal + ")");
                        }
                    });
                    sellButton.on('pointerdown', function () {
                        gameGold += fireTower.sellVal;
                        fireTower.destroy();
                        towerName.setText("TYPE:");
                        towerLevel.setText("LEVEL: ");
                        towerDamage.setText("DAMAGE: ");
                        upgradeText.setText("UPGRADE");
                        sellText.setText("SELL");
                    });
                });
                curBut = 'None';
                gameGold -= FIRECOST;
            }
            else if (curBut == 'waterTower' && (gameGold - WATERCOST >= 0)) {
                var waterTower = waterTowers.get();
                waterTower.place(pointer.x, pointer.y);
                waterTower.setInteractive().on('pointerdown', function () {
                    upgradeButton.off('pointerdown');
                    sellButton.off('pointerdown');

                    towerName.setText("TYPE: " + waterTower.element);
                    towerLevel.setText("LEVEL: " + waterTower.level);
                    towerDamage.setText("DAMAGE: " + waterTower.dmg);
                    upgradeText.setText("UPGRADE(" + waterTower.upgradeCost + ")");
                    sellText.setText("SELL(" + waterTower.sellVal + ")");

                    upgradeButton.on('pointerdown', function() {
                        if(gameGold - waterTower.upgradeCost >= 0) {
                            waterTower.upgrade()
                            towerName.setText("TYPE: " + waterTower.element);
                            towerLevel.setText("LEVEL: " + waterTower.level);
                            towerDamage.setText("DAMAGE: " + waterTower.dmg);
                            upgradeText.setText("UPGRADE(" + waterTower.upgradeCost + ")");
                            sellText.setText("SELL(" + waterTower.sellVal + ")");
                        }
                    });
                    sellButton.on('pointerdown', function () {
                        gameGold += waterTower.sellVal;
                        waterTower.destroy();
                        towerName.setText("TYPE:");
                        towerLevel.setText("LEVEL: ");
                        towerDamage.setText("DAMAGE: ");
                        upgradeText.setText("UPGRADE");
                        sellText.setText("SELL");
                    });
                });
                curBut = 'None';
                gameGold -= WATERCOST;
            }
            else if (curBut == 'windTower' && (gameGold - WINDCOST >= 0)) {
                var windTower = windTowers.get();
                windTower.place(pointer.x, pointer.y);
                windTower.setInteractive().on('pointerdown', function () {
                    upgradeButton.off('pointerdown');
                    sellButton.off('pointerdown');

                    towerName.setText("TYPE: " + windTower.element);
                    towerLevel.setText("LEVEL: " + windTower.level);
                    towerDamage.setText("DAMAGE: " + windTower.dmg);
                    upgradeText.setText("UPGRADE(" + windTower.upgradeCost + ")");
                    sellText.setText("SELL(" + windTower.sellVal + ")");

                    upgradeButton.on('pointerdown', function() {
                        if(gameGold - windTower.upgradeCost >= 0) {
                            windTower.upgrade()
                            towerName.setText("TYPE: " + windTower.element);
                            towerLevel.setText("LEVEL: " + windTower.level);
                            towerDamage.setText("DAMAGE: " + windTower.dmg);
                            upgradeText.setText("UPGRADE(" + windTower.upgradeCost + ")");
                            sellText.setText("SELL(" + windTower.sellVal + ")");
                        }
                    });
                    sellButton.on('pointerdown', function () {
                        gameGold += windTower.sellVal;
                        windTower.destroy();
                        towerName.setText("TYPE:");
                        towerLevel.setText("LEVEL: ");
                        towerDamage.setText("DAMAGE: ");
                        upgradeText.setText("UPGRADE");
                        sellText.setText("SELL");
                    });
                });
                gameGold -= windTower.cost;
                curBut = 'None';
            }
            else if (curBut == 'iceTower' && (gameGold - ICECOST >= 0)) {
                var iceTower = iceTowers.get();
                iceTower.place(pointer.x, pointer.y);
                iceTower.setInteractive().on('pointerdown', function () {
                    upgradeButton.off('pointerdown');
                    sellButton.off('pointerdown');

                    towerName.setText("TYPE: " + iceTower.element);
                    towerLevel.setText("LEVEL: " + iceTower.level);
                    towerDamage.setText("DAMAGE: " + iceTower.dmg);
                    upgradeText.setText("UPGRADE(" + iceTower.upgradeCost + ")");
                    sellText.setText("SELL(" + iceTower.sellVal + ")");

                    upgradeButton.on('pointerdown', function() {
                        if(gameGold - iceTower.upgradeCost >= 0) {
                            iceTower.upgrade()
                            towerName.setText("TYPE: " + iceTower.element);
                            towerLevel.setText("LEVEL: " + iceTower.level);
                            towerDamage.setText("DAMAGE: " + iceTower.dmg);
                            upgradeText.setText("UPGRADE(" + iceTower.upgradeCost + ")");
                            sellText.setText("SELL(" + iceTower.sellVal + ")");
                        }
                    });
                    sellButton.on('pointerdown', function () {
                        gameGold += iceTower.sellVal;
                        iceTower.destroy();
                        towerName.setText("TYPE:");
                        towerLevel.setText("LEVEL: ");
                        towerDamage.setText("DAMAGE: ");
                        upgradeText.setText("UPGRADE");
                        sellText.setText("SELL");
                    });
                });
                gameGold -= ICECOST;
                curBut = 'None';
            }
            else if (curBut == 'elecTower' && (gameGold - ELECCOST >= 0)) {
                var elecTower = elecTowers.get();
                elecTower.place(pointer.x, pointer.y);
                elecTower.setInteractive().on('pointerdown', function () {
                    upgradeButton.off('pointerdown');
                    sellButton.off('pointerdown');

                    towerName.setText("TYPE: " + elecTower.element);
                    towerLevel.setText("LEVEL: " + elecTower.level);
                    towerDamage.setText("DAMAGE: " + elecTower.dmg);
                    upgradeText.setText("UPGRADE(" + elecTower.upgradeCost + ")");
                    sellText.setText("SELL(" + elecTower.sellVal + ")");

                    upgradeButton.on('pointerdown', function() {
                        if(gameGold - elecTower.upgradeCost >= 0) {
                            elecTower.upgrade()
                            towerName.setText("TYPE: " + elecTower.element);
                            towerLevel.setText("LEVEL: " + elecTower.level);
                            towerDamage.setText("DAMAGE: " + elecTower.dmg);
                            upgradeText.setText("UPGRADE(" + elecTower.upgradeCost + ")");
                            sellText.setText("SELL(" + elecTower.sellVal + ")");
                        }
                    });
                    sellButton.on('pointerdown', function () {
                        gameGold += elecTower.sellVal;
                        elecTower.destroy();
                        towerName.setText("TYPE:");
                        towerLevel.setText("LEVEL: ");
                        towerDamage.setText("DAMAGE: ");
                        upgradeText.setText("UPGRADE");
                        sellText.setText("SELL");
                    });
                });
                gameGold -= ELECCOST;
                curBut = 'None';
            }
        });

        this.input.on('pointermove', function (pointer) {
            if (curBut == 'fireTower') {
                fireCursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y);
                waterCursor.setVisible(false);
                windCursor.setVisible(false);
                iceCursor.setVisible(false);
                elecCursor.setVisible(false);
            }
            else if (curBut == 'waterTower') {
                waterCursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y);
                fireCursor.setVisible(false);
                windCursor.setVisible(false);
                iceCursor.setVisible(false);
                elecCursor.setVisible(false);
            }
            else if (curBut == 'windTower') {
                windCursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y);
                fireCursor.setVisible(false);
                waterCursor.setVisible(false);
                iceCursor.setVisible(false);
                elecCursor.setVisible(false);
            }
            else if (curBut == 'iceTower') {
                iceCursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y);
                fireCursor.setVisible(false);
                waterCursor.setVisible(false);
                windCursor.setVisible(false);
                elecCursor.setVisible(false);
            }
            else if (curBut == 'elecTower') {
                elecCursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y);
                fireCursor.setVisible(false);
                waterCursor.setVisible(false);
                windCursor.setVisible(false);
            }
            else {
                fireCursor.setVisible(false);
                waterCursor.setVisible(false);
                windCursor.setVisible(false);
                iceCursor.setVisible(false);
                elecCursor.setVisible(false);
            }
        })

        bullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});
        this.physics.add.overlap(enemies, bullets, damageEnemy);
        this.physics.add.overlap(enemies2, bullets, damageEnemy);
        this.physics.add.overlap(enemies3, bullets, damageEnemy);

    },

    update: function(time, delta) {
        goldText.setText("GOLD: " + gameGold);
        if(isNaN(gameGold)) {
            gameGold = 0;
        }
        
        if (time > this.nextEnemy && wave1 > 0)
        {
            var enemy = enemies.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 5000;
                wave1--;
            }
        }
        if (wave1 == 0) {
            var enemy = enemies.get();
            if (enemy)
            {
                enemy.setActive(false);
                enemy.setVisible(false);
                enemy.startOnPath();

                this.nextEnemy = time + 30000;
                wave1--;
            }
        }

        if (time > this.nextEnemy && wave2 > 0 && wave1 == -1)
        {
            var enemy = enemies2.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 4000;
                wave2--;
            }
        }

        if (wave2 == 0) {
            var enemy = enemies2.get();
            if (enemy)
            {
                enemy.setActive(false);
                enemy.setVisible(false);
                enemy.startOnPath();

                this.nextEnemy = time + 30000;
                wave2--;
            }


        }

        if (time > this.nextEnemy && wave3 > 0 && wave2 == -1)
        {
            var enemy = enemies3.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 3000;
                wave3--;
            }
        }
        livesText.setText("LIVES: " + lives);
    },
})

function getEnemy(x, y, distance) {
    var enemyUnits = enemies.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
} 

function getEnemy2(x, y, distance) {
    var enemyUnits = enemies2.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
} 

function getEnemy3(x, y, distance) {
    var enemyUnits = enemies3.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
} 

function damageEnemy(enemy, bullet) {  
    if (enemy.active === true && bullet.active === true) {
        if(bullet.element != 'Fire' && bullet.element != 'Wind') {
            bullet.consume();
        }
        enemy.receiveDamage(bullet.dmg);
    }
}

function addBullet(x, y, angle, bulletType, damage) {
    var bullet = bullets.get();
    if (bullet)
    {
        bullet.fire(x, y, angle, bulletType, damage);
    }
}

var Enemy = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('wraithEnemy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.bounty = 3;
        this.hp = 0;
        this.status = 'None';
        this.speed = 1/100000;

    },
    startOnPath: function ()
    {
        // set the t parameter at the start of the path
        this.follower.t = 0;
        this.hp = 100;
        
        // get x and y of the given t point            
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
    },
    restoreSpeed: function() {
        this.speed = 1/100000;
    },
    push: function() {
        this.speed = 1/10000;
    },
    pull: function() {
        this.speed = -1/100000;
    },
    stun: function() {
        this.speed = 0;
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },

    receiveDamage: function(damage) {
        this.hp -= damage;
        if(this.hp <= 0) {
            // this.setActive(false);
            // this.setVisible(false);
            this.destroy();
            gameGold += this.bounty;
        }
    },
    
    update: function (time, delta)
    {
        this.follower.t += this.speed * delta;
        path.getPoint(this.follower.t, this.follower.vec);
        
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
            lives--;
        }

    }

});

var Enemy2 = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('golemEnemy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.bounty = 10;
        this.hp = 0;
        this.status = 'None';
        this.speed = 1/100000;

    },
    startOnPath: function ()
    {
        // set the t parameter at the start of the path
        this.follower.t = 0;
        this.hp = 500;
        
        // get x and y of the given t point            
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
    },
    restoreSpeed: function() {
        this.speed = 1/100000;
    },
    push: function() {
        this.speed = 1/10000;
    },
    pull: function() {
        this.speed = -1/100000;
    },
    stun: function() {
        this.speed = 0;
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },

    receiveDamage: function(damage) {
        this.hp -= damage;
        if(this.hp <= 0) {
            // this.setActive(false);
            // this.setVisible(false);
            this.destroy();
            gameGold += this.bounty;
        }
    },
    
    update: function (time, delta)
    {
        this.follower.t += this.speed * delta;
        path.getPoint(this.follower.t, this.follower.vec);
        
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
            lives--;
        }

    }

});

var Enemy3 = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('minotaurEnemy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.bounty = 15;
        this.hp = 0;
        this.status = 'None';
        this.speed = 1/100000;

    },
    startOnPath: function ()
    {
        // set the t parameter at the start of the path
        this.follower.t = 0;
        this.hp = 1000;
        
        // get x and y of the given t point            
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
    },
    restoreSpeed: function() {
        this.speed = 1/100000;
    },
    push: function() {
        this.speed = 1/10000;
    },
    pull: function() {
        this.speed = -1/100000;
    },
    stun: function() {
        this.speed = 0;
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },

    receiveDamage: function(damage) {
        this.hp -= damage;
        if(this.hp <= 0) {
            // this.setActive(false);
            // this.setVisible(false);
            this.destroy();
            gameGold += this.bounty;
        }
    },
    
    update: function (time, delta)
    {
        this.follower.t += this.speed * delta;
        path.getPoint(this.follower.t, this.follower.vec);
        
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
            lives--;
        }

    }

});

var FireTower = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function FireTower (scene, x, y) {
        this.nextTic = 0;

        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgFireTower');
        this.setPosition(x, y);
        this.element = 'Fire';
        this.level = 1;
        this.range = 200;
        this.dmg = 1;
        this.upgradeCost = (this.level * 2 * FIRECOST);
        this.sellVal = Math.round((FIRECOST / 2));
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },

    upgrade: function() {
        if(this.level < 3) {
            this.level++;
            this.range += 50;
            this.dmg *= 2;
            this.upgradeCost = (this.level * 2 * FIRECOST);
            this.sellVal = Math.round((this.level * FIRECOST) / 2);
        }
    },

    fire: function() {
        var enemy = getEnemy(this.x, this.y, this.range);
        var enemy2 = getEnemy2(this.x, this.y, this.range);
        var enemy3 = getEnemy3(this.x, this.y, this.range);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, 'Fire', this.dmg);
        }

        if(enemy2) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy2.x, enemy2.y);
            addBullet(this.x, this.y, angle, 'Fire', this.dmg);
        }

        if(enemy3) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Fire', this.dmg);
        }
    },

    update: function(time, delta) {
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1000;
        }
    }
});

var WaterTower = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function WaterTower (scene, x, y) {
        this.nextTic = 0;

        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgWaterTower');
        this.setPosition(x, y);
        this.element = 'Water';
        this.level = 1;
        this.range = 200;
        this.dmg = 1;
        this.upgradeCost = (this.level * 2 * WATERCOST);
        this.sellVal = Math.round((WATERCOST / 2));
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },

    upgrade: function() {
        if(this.level < 3) {
            this.level++;
            this.range += 50;
            this.dmg *= 2;
            this.upgradeCost = (this.level * 2 * WATERCOST);
            this.sellVal = Math.round((this.level * WATERCOST) / 2);
        }
    },

    fire: function() {
        var enemy = getEnemy(this.x, this.y, this.range);
        var enemy2 = getEnemy2(this.x, this.y, this.range);
        var enemy3 = getEnemy3(this.x, this.y, this.range);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, 'Water', this.dmg);
        }

        if(enemy2) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy2.x, enemy2.y);
            addBullet(this.x, this.y, angle, 'Water', this.dmg);
        }

        if(enemy3) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Water', this.dmg);
        }
    },

    update: function(time, delta) {
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 500;
        }
    }
});

var WindTower = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function WindTower (scene, x, y) {
        this.nextTic = 0;

        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgWindTower');
        this.setPosition(x, y);
        this.element = 'Wind';
        this.level = 1;
        this.range = 200;
        this.dmg = 0;
        this.upgradeCost = (this.level * 2 * WATERCOST);
        this.sellVal = Math.round((WATERCOST / 2));
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },

    upgrade: function() {
        if(this.level < 3) {
            this.level++;
            this.range += 50;
            this.dmg *= 2;
            this.upgradeCost = (this.level * 2 * WATERCOST);
            this.sellVal = Math.round((this.level * WATERCOST) / 2);
        }
    },

    fire: function() {
        var enemy = getEnemy(this.x, this.y, this.range);
        var enemy2 = getEnemy2(this.x, this.y, this.range);
        var enemy3 = getEnemy3(this.x, this.y, this.range);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, 'Wind', this.dmg);
        }

        if(enemy2) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy2.x, enemy2.y);
            addBullet(this.x, this.y, angle, 'Wind', this.dmg);
        }

        if(enemy3) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Wind', this.dmg);
        }
    },

    update: function(time, delta) {
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1000;
        }
    }
});

var IceTower = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function FireTower (scene, x, y) {
        this.nextTic = 0;

        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgIceTower');
        this.setPosition(x, y);
        this.element = 'Ice';
        this.level = 1;
        this.range = 200;
        this.dmg = 5;
        this.upgradeCost = (this.level * 2 * WATERCOST);
        this.sellVal = Math.round((WATERCOST / 2));
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },

    upgrade: function() {
        if(this.level < 3) {
            this.level++;
            this.range += 50;
            this.dmg *= 2;
            this.upgradeCost = (this.level * 2 * WATERCOST);
            this.sellVal = Math.round((this.level * WATERCOST) / 2);
        }
    },

    fire: function() {
        var enemy = getEnemy(this.x, this.y, this.range);
        var enemy2 = getEnemy2(this.x, this.y, this.range);
        var enemy3 = getEnemy3(this.x, this.y, this.range);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, 'Ice', this.dmg);
        }

        if(enemy2) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy2.x, enemy2.y);
            addBullet(this.x, this.y, angle, 'Ice', this.dmg);
        }

        if(enemy3) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Ice', this.dmg);
        }
    },

    update: function(time, delta) {
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1000;
        }
    }
});

var ElecTower = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function FireTower (scene, x, y) {
        this.nextTic = 0;

        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgElecTower');
        this.setPosition(x, y);
        this.element = 'Electric';
        this.level = 1;
        this.range = 200;
        this.dmg = 5;
        this.upgradeCost = (this.level * 2 * WATERCOST);
        this.sellVal = Math.round((WATERCOST / 2));
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },

    upgrade: function() {
        if(this.level < 3) {
            this.level++;
            this.range += 50;
            this.dmg *= 2;
            this.upgradeCost = (this.level * 2 * WATERCOST);
            this.sellVal = Math.round((this.level * WATERCOST) / 2);
        }
    },

    fire: function() {
        var enemy = getEnemy(this.x, this.y, this.range);
        var enemy2 = getEnemy2(this.x, this.y, this.range);
        var enemy3 = getEnemy3(this.x, this.y, this.range);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, 'Electric', this.dmg);
        }

        if(enemy2) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy2.x, enemy2.y);
            addBullet(this.x, this.y, angle, 'Electric', this.dmg);
        }

        if(enemy3) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Electric', this.dmg);
        }
    },

    update: function(time, delta) {
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1000;
        }
    }
});

var Bullet = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setDepth(1);
        this.lifespan = 0;
        this.speed = Phaser.Math.GetSpeed(600, 1);
    },

    fire: function (x, y, angle, towerType, damage)
    {
        this.element = towerType;
        this.dmg = damage;

        if(this.element == 'Fire') {
            this.setTexture('imgFireBullet');
        }
        if(this.element == 'Water') {
            this.setTexture('imgWaterBullet');
        }
        if(this.element == 'Wind') {
            this.setTexture('imgWindBullet');
        }
        if(this.element == 'Ice') {
            this.setTexture('imgIceBullet');
        }
        if(this.element == 'Electric') {
            this.setTexture('imgElecBullet');
        }

        this.setActive(true);
        this.setVisible(true);
        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x, y);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);
        this.setRotation(angle);

        this.lifespan = 500;
    },

    consume: function(){
        this.destroy();
    },

    update: function (time, delta)
    {
        this.lifespan -= delta;

        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);

        if (this.lifespan <= 0)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
});

var StatsMenu = new Phaser.Class ({
    Extends: Phaser.GameObjects.Container,
    initialize:

    function StatsMenu (scene, x, y) {
        Phaser.GameObjects.Container.call(this, scene, 0, 0);
        scene.add.rectangle(0, 0, 0, 35, 0x00AAFF);

    },

    update: function(time, delta) {
    }
});