var LevelThree = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

    function LevelThree ()
    {
        Phaser.Scene.call(this, { key: 'LevelThree' });
    },
    
    preload: function() {
        this.load.image('imgGrass3', 'src/assets/backgrounds/imgGrass3.jpg');
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
        this.load.image('wraithEnemyEasy', 'src/assets/enemies/wraithEasy.png');
        this.load.image('wraithEnemyMedium', 'src/assets/enemies/wraithMedium.png');
        this.load.image('wraithEnemyHard', 'src/assets/enemies/wraithHard.png');
        this.load.image('golemEnemyEasy', 'src/assets/enemies/golemEasy.png');
        this.load.image('golemEnemyMedium', 'src/assets/enemies/golemMedium.png');
        this.load.image('golemEnemyHard', 'src/assets/enemies/golemHard.png');
        this.load.image('minotaurEnemyEasy', 'src/assets/enemies/minotaurEasy.png');
        this.load.image('minotaurEnemyMedium', 'src/assets/enemies/minotaurMedium.png');
        this.load.image('minotaurEnemyHard', 'src/assets/enemies/minotaurHard.png');
        this.load.image('pathTextureA', 'src/assets/Map/path_base.png');
        this.load.image('pathTextureB', 'src/assets/Map/path_top.png');
        this.load.image('rock1', 'src/assets/Map/rock_1.png');
        this.load.image('rock2', 'src/assets/Map/rock_2.png');
        this.load.image('rock3', 'src/assets/Map/rock_3.png');
        this.load.image('rock4', 'src/assets/Map/rock_4.png');
        this.load.image('rock5', 'src/assets/Map/rock_5.png');
        this.load.image('tree1', 'src/assets/Map/tree_1.png');
        this.load.image('tree2', 'src/assets/Map/tree_2.png');
        this.load.image('tree3', 'src/assets/Map/tree_3.png');
    },

    create: function() {
        //this.add.text(20, 20, "Level Two");
        pointsX = [0, 400, 400, 200, 200, 600, 600, 1200, 1200, 800, 800, 1400, 1400, 1600];
        pointsY = [300, 300, 450, 450, 600, 600, 100, 100, 300, 300, 550, 550, 450, 450];
        gameGold = 50;
        lives = 20;
        curWave = 1;
        wave1 = 5;
        wave2 = 10;
        wave3 = 15;
        wave4 = 20;
        wave5 = 35;
        wave6 = 30;
        wave7 = 35;
        wave8 = 40;
        wave9 = 50;
        wave10 = 100;
        rocks = null;
        rocks2 = null;
        rocks3 = null;
        rocks4 = null;
        rocks5 = null;
        trees = null;
        trees2 = null;
        trees3 = null;
        curBut ='None';

        this.add.text(20, 35, "curBut: ");
        var currentBtn = this.add.text(100, 35, "None");

        var mainMenuButton = this.add.sprite(1510, 35, 'imgMainMenuButton').setInteractive()
        .on('pointerover', () => mainMenuButton.setTint(0xC0C0C0))
        .on('pointerout', () => mainMenuButton.clearTint())
        .on('pointerdown', () => this.scene.start('MainMenu'), this);
        var mainMenuTxt = this.add.text(1465, 20, "MAIN MENU", {font: '14pt pixel', fill: '0xffffff'});

        this.background = this.add.sprite(0, 0, "imgGrass3");
        this.background.setOrigin(0, 0);
        this.background.depth = -3;

        var bottomUI = this.add.sprite(950, 825, 'imgBottomUI').setInteractive();
        bottomUI.depth = -1;
        
        // Game stats container
        var gameStatsBG = this.add.sprite(150, 75, 'imgGameStatsBG').setInteractive();
        gameStatsBG.depth = -1;
        goldText = this.add.text(45, 25, "GOLD : " + gameGold, {font: '14pt pixel', fill: '0xffffff'});
        livesText = this.add.text(45, 60, "LIVES : " + lives, {font: '14pt pixel', fill: '0xffffff'});
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
        path = this.add.path(0, 300);

        for (var i = 0; i < pointsX.length; i++) {
            path.lineTo(pointsX[i], pointsY[i]);
        }
        
        
        graphics.lineStyle(0, 0xffffff, 1);
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
        enemies4 = this.physics.add.group({classType: Enemy4, runChildUpdate: true});
        enemies5 = this.physics.add.group({classType: Enemy5, runChildUpdate: true});
        enemies6 = this.physics.add.group({classType: Enemy6, runChildUpdate: true});
        enemies7 = this.physics.add.group({classType: Enemy7, runChildUpdate: true});
        enemies8 = this.physics.add.group({classType: Enemy8, runChildUpdate: true});
        enemies9 = this.physics.add.group({classType: Enemy9, runChildUpdate: true});
        rocks = this.add.group({classType: Rock, runChildUpdate: true});
        rocks2 = this.add.group({classType: Rock2, runChildUpdate: true});
        rocks3 = this.add.group({classType: Rock3, runChildUpdate: true});
        rocks4 = this.add.group({classType: Rock4, runChildUpdate: true});
        rocks5 = this.add.group({classType: Rock5, runChildUpdate: true});
        trees = this.add.group({classType: Tree, runChildUpdate: true});
        trees2 = this.add.group({classType: Tree2, runChildUpdate: true});
        trees3 = this.add.group({classType: Tree3, runChildUpdate: true});

        var fireCursor = this.add.image(0, 0, 'imgFireTower').setVisible(false);
        var waterCursor = this.add.image(0, 0, 'imgWaterTower').setVisible(false);
        var windCursor = this.add.image(0, 0, 'imgWindTower').setVisible(false);
        var iceCursor = this.add.image(0, 0, 'imgIceTower').setVisible(false);
        var elecCursor = this.add.image(0, 0, 'imgElecTower').setVisible(false);

        this.nextEnemy = 0;

        var rock1 = rocks.get();
        rock1.place(450, 300);

        var rock2 = rocks2.get();
        rock2.place(460, 330);

        var rock3 = rocks3.get();
        rock3.place(715, 600);

        var rock4 = rocks4.get();
        rock4.place(750, 650);
        rock4.setScale(2);

        var rock5 = rocks5.get();
        rock5.place(355, 675);

        var rock6 = rocks2.get();
        rock6.place(35, 180);
        rock6.setScale(2);

        var rock7 = rocks.get();
        rock7.place(70, 225);
        rock7.setScale(1.5);

        var rock8 = rocks3.get();
        rock8.place(1050, 450);
        rock8.setScale(2);

        var rock9 = rocks2.get();
        rock9.place(1100, 190);
        rock9.setScale(2.3);

        var rock10 = rocks3.get();
        rock10.place(1025, 180);
        rock10.setScale(1.5);

        var tree1 = trees.get();
        tree1.place(500, 280);
        tree1.setScale(0.5);

        var tree2 = trees2.get();
        tree2.place(30, 450);

        var tree3 = trees3.get();
        tree3.place(55, 500);

        var tree4 = trees.get();
        tree4.place(300, 685);
        tree4.setScale(0.5);
        tree4.setRotation(1.5708)

        var tree5 = trees3.get();
        tree5.place(325, 50);
        tree5.setScale(0.8);

        var tree6 = trees2.get();
        tree6.place(1565, 150);
        tree6.setScale(0.7)

        var tree7 = trees2.get();
        tree7.place(1000, 400);
        tree7.setScale(0.6)

        var tree8 = trees.get();
        tree8.place(1515, 560);
        tree8.setScale(0.7);

        var tree9 = trees.get();
        tree9.place(1350, 50);
        tree9.setScale(0.8);

        var tree10 = trees3.get();
        tree10.place(1055, 225);
        tree10.setScale(0.5);


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
                            gameGold -= fireTower.upgradeCost;
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
                            gameGold -= waterTower.upgradeCost;
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
                            gameGold -= windTower.upgradeCost;
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
                gameGold -= WINDCOST;
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
                            gameGold -= iceTower.upgradeCost;
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
                            gameGold -= elecTower.upgradeCost;
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
        this.physics.add.overlap(enemies4, bullets, damageEnemy);
        this.physics.add.overlap(enemies5, bullets, damageEnemy);
        this.physics.add.overlap(enemies6, bullets, damageEnemy);
        this.physics.add.overlap(enemies7, bullets, damageEnemy);
        this.physics.add.overlap(enemies8, bullets, damageEnemy);
        this.physics.add.overlap(enemies9, bullets, damageEnemy);
    },

    update: function(time, delta) {
        if(lives == 0) {
            this.scene.start('GameOver');
        }
        goldText.setText("GOLD: " + gameGold);
        if(isNaN(gameGold)) {
            gameGold = 0;
        }
        
        if (time > this.nextEnemy && wave5 > 0)
        {
            var enemy = enemies5.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 3000;
                wave5--;
                if(wave4 == -1) {
                    curWave++;
                    wave4--;
                }
            }
        }

        if (wave5 == 0) {
            var enemy = enemies5.get();
            if (enemy)
            {
                enemy.setActive(false);
                enemy.setVisible(false);
                enemy.startOnPath();

                this.nextEnemy = time + 10000;
                wave5--;
            }
        }

        if (time > this.nextEnemy && wave6 > 0 && wave5 <= -1)
        {
            var enemy = enemies6.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 2500;
                wave6--;
                if(wave5 == -1) {
                    curWave++;
                    wave6--;
                }
            }
        }

        if (wave6 == 0) {
            var enemy = enemies6.get();
            if (enemy)
            {
                enemy.setActive(false);
                enemy.setVisible(false);
                enemy.startOnPath();

                this.nextEnemy = time + 10000;
                wave6--;
            }
        }

        if (time > this.nextEnemy && wave7 > 0 && wave6 <= -1)
        {
            var enemy = enemies7.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 2500;
                wave7--;
                if(wave6 == -1) {
                    curWave++;
                    wave6--;
                }
            }
        }

        if (wave7 == 0) {
            var enemy = enemies7.get();
            if (enemy)
            {
                enemy.setActive(false);
                enemy.setVisible(false);
                enemy.startOnPath();

                this.nextEnemy = time + 10000;
                wave7--;
            }
        }

        if (time > this.nextEnemy && wave8 > 0 && wave7 <= -1)
        {
            var enemy = enemies8.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 2000;
                wave8--;
                if(wave7 == -1) {
                    curWave++;
                    wave7--;
                }
            }
        }

        if (wave8 == 0) {
            var enemy = enemies8.get();
            if (enemy)
            {
                enemy.setActive(false);
                enemy.setVisible(false);
                enemy.startOnPath();

                this.nextEnemy = time + 10000;
                wave8--;
            }
        }

        if (time > this.nextEnemy && wave9 > 0 && wave8 <= -1)
        {
            var enemy = enemies8.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 2000;
                wave9--;
                if(wave8 == -1) {
                    curWave++;
                    wave8--;
                }
            }
        }

        if (wave9 == 0) {
            var enemy = enemies9.get();
            if (enemy)
            {
                enemy.setActive(false);
                enemy.setVisible(false);
                enemy.startOnPath();

                this.nextEnemy = time + 10000;
                wave8--;
            }
        }

        if (time > this.nextEnemy && wave10 > 0 && wave9 <= -1)
        {
            var enemy = enemies7.get();
            var enemy2 = enemies8.get();
            var enemy3 = enemies9.get();

            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 1000;
                wave10--;
                if(wave9 == -1) {
                    curWave++;
                    wave9--;
                }
            }

            if (enemy2)
            {
                enemy2.setActive(true);
                enemy2.setVisible(true);
                enemy2.startOnPath();
                this.nextEnemy = time + 1250;
            }

            if (enemy3)
            {
                enemy3.setActive(true);
                enemy3.setVisible(true);
                enemy3.startOnPath();
                this.nextEnemy = time + 1500;
            }
        }

        if (wave10 == 0) {
            var enemy = enemies9.get();
            if (enemy)
            {
                enemy.setActive(false);
                enemy.setVisible(false);
                enemy.startOnPath();

                this.nextEnemy = time + 25000;
                wave10--;
                if (wave10 < 0) {
                    this.scene.start('Victory');
                }
            }
        }

        waveText.setText("WAVE: " + curWave);
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

function getEnemy4(x, y, distance) {
    var enemyUnits = enemies4.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
} 

function getEnemy5(x, y, distance) {
    var enemyUnits = enemies5.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
} 

function getEnemy6(x, y, distance) {
    var enemyUnits = enemies6.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
} 

function getEnemy7(x, y, distance) {
    var enemyUnits = enemies7.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
} 

function getEnemy8(x, y, distance) {
    var enemyUnits = enemies8.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
} 

function getEnemy9(x, y, distance) {
    var enemyUnits = enemies9.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
} 


function damageEnemy(enemy, bullet) {  
    var damage = bullet.dmg;
    if (enemy.active === true && bullet.active === true) {
        if(bullet.element != 'Fire' && bullet.element != 'Wind') {
            // remove bullet sprite
            bullet.consume();

            // Ice reactions
            if(bullet.element == 'Ice') {
                if(enemy.status != 'Water' || enemy.status != 'Fire' || enemy.status != 'Electric' || enemy.status != 'Stun') {
                    enemy.slow();
                    enemy.setStatus('Ice', ICETINT);
                }
                else if (enemy.status == 'Water') {
                    enemy.freeze();
                    enemy.setStatus('Ice', ICETINT);
                }
                else  if (enemy.status == 'Fire') {
                    damage *= 3;
                    enemy.setStatus('None', '0xffffff');
                }
                else  if (enemy.status == 'Electric') {
                    enemy.stun();
                    enemy.setStatus('Stun', '0xffffff');
                }
            }

            // Water reactions
            if(bullet.element == 'Water') {
                if(enemy.status != 'Electric' && enemy.status != 'Fire' && enemy.status != 'Ice') {
                    enemy.setStatus('Water', WATERTINT);
                }
                if (enemy.status == 'Ice') {
                    enemy.freeze();
                    enemy.setStatus('Ice', ICETINT);
                }
                else if (enemy.status == 'Fire') {
                    damage *= 2;
                    enemy.setStatus('None', '0xffffff');
                }
                else if(enemy.status == 'Electric') {
                    //
                }
            }

            // Electric Reactions
            if(bullet.element == 'Electric') {
                if(enemy.status != 'Water' && enemy.status != 'Fire' && enemy.status != 'Ice') {
                    enemy.setStatus('Electric', ELECTINT);
                }
                if(enemy.status == 'Water') {
                    //
                }
                if(enemy.status == 'Fire') {
                    enemy.stun();
                    enemy.setStatus('Stun', '0xffffff');
                }
                if(enemy.status == 'Ice') {
                    enemy.stun();
                    enemy.setStatus('Stun', '0xffffff');
                }
                
            }

            // Wind behavior 
        } else if(bullet.element == 'Wind'){
            if(((bullet.x > enemy.x) && (bullet.y < enemy.y)) || ((bullet.x >= enemy.x) && (bullet.y >= enemy.y))) {
                enemy.pull();
                enemy.setStatus('None', '0xffffff');
            }
            else if(((bullet.x < enemy.x) && (bullet.y > enemy.y)) || ((bullet.x <= enemy.x) && (bullet.y <= enemy.y))) {
                enemy.push();
                enemy.setStatus('None', '0xffffff');
            }

            // Fire reactions
        } else if(bullet.element == 'Fire') {
            if(enemy.status != 'Water' && enemy.status != 'Wind' && enemy.status != 'Ice' && enemy.status != 'Electric') {
                enemy.setStatus('Fire', FIRETINT);
            }
            else if(enemy.status == 'Water') {
                damage *= 2;
                enemy.setStatus('None', '0xffffff');
            }
            else if(enemy.status == 'Ice') {
                damage *= 3;
                enemy.setStatus('None', '0xffffff');
            }
            else if(enemy.status == 'Electric') {
                damage *=1.5;
                enemy.setStatus('None', '0xffffff');
            }
        }
        enemy.receiveDamage(damage);
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
        this.setTexture('wraithEnemyEasy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.bounty = 1;
        this.hp = 0;
        this.status = 'None';
        this.speed = 1/30000;
    },
    startOnPath: function ()
    {
        // set the t parameter at the start of the path
        this.follower.t = 0;
        this.hp = 25;
        
        // get x and y of the given t point            
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
    },
    setStatus: function(status, tint) {
        this.status = status;
        this.setTint(tint);
    },
    restoreSpeed: function() {
        this.speed = 1/30000;
    },
    push: function() {
        var that = this;
        that.speed = 1/10000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    pull: function() {
        var that = this;
        that.speed = -1/20000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    stun: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 2000);
    },
    slow: function() {
        var that = this;
        that.speed = 1/45000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 1000);
    },
    freeze: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 3000);
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
        this.setTexture('golemEnemyEasy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.bounty = 2;
        this.hp = 0;
        this.status = 'None';
        this.speed = 1/25000;

    },
    startOnPath: function ()
    {
        // set the t parameter at the start of the path
        this.follower.t = 0;
        this.hp = 75;
        
        // get x and y of the given t point            
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
    },
    setStatus: function(status, tint) {
        this.status = status;
        this.setTint(tint);
    },
    restoreSpeed: function() {
        this.speed = 1/30000;
    },
    push: function() {
        var that = this;
        that.speed = 1/10000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    pull: function() {
        var that = this;
        that.speed = -1/20000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    stun: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 2000);
    },
    slow: function() {
        var that = this;
        that.speed = 1/45000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 1000);
    },
    freeze: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 3000);
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
        this.setTexture('minotaurEnemyEasy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.bounty = 3;
        this.hp = 0;
        this.status = 'None';
        this.speed = 1/25000;

    },
    startOnPath: function ()
    {
        // set the t parameter at the start of the path
        this.follower.t = 0;
        this.hp = 200;
        
        // get x and y of the given t point            
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
    },
    setStatus: function(status, tint) {
        this.status = status;
        this.setTint(tint);
    },
    restoreSpeed: function() {
        this.speed = 1/30000;
    },
    push: function() {
        var that = this;
        that.speed = 1/10000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    pull: function() {
        var that = this;
        that.speed = -1/20000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    stun: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 2000);
    },
    slow: function() {
        var that = this;
        that.speed = 1/45000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 1000);
    },
    freeze: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 3000);
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

var Enemy4 = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('wraithEnemyMedium');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.bounty = 4;
        this.hp = 0;
        this.status = 'None';
        this.speed = 1/25000;

    },
    startOnPath: function ()
    {
        // set the t parameter at the start of the path
        this.follower.t = 0;
        this.hp = 200;
        
        // get x and y of the given t point            
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
    },
    setStatus: function(status, tint) {
        this.status = status;
        this.setTint(tint);
    },
    restoreSpeed: function() {
        this.speed = 1/30000;
    },
    push: function() {
        var that = this;
        that.speed = 1/10000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    pull: function() {
        var that = this;
        that.speed = -1/20000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    stun: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 2000);
    },
    slow: function() {
        var that = this;
        that.speed = 1/45000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 1000);
    },
    freeze: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 3000);
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

var Enemy5 = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('golemEnemyMedium');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.bounty = 5;
        this.hp = 0;
        this.status = 'None';
        this.speed = 1/20000;

    },
    startOnPath: function ()
    {
        // set the t parameter at the start of the path
        this.follower.t = 0;
        this.hp = 50;
        
        // get x and y of the given t point            
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
    },
    setStatus: function(status, tint) {
        this.status = status;
        this.setTint(tint);
    },
    restoreSpeed: function() {
        this.speed = 1/30000;
    },
    push: function() {
        var that = this;
        that.speed = 1/10000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    pull: function() {
        var that = this;
        that.speed = -1/20000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    stun: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 2000);
    },
    slow: function() {
        var that = this;
        that.speed = 1/45000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 1000);
    },
    freeze: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 3000);
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

var Enemy6 = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('minotaurEnemyMedium');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.bounty = 6;
        this.hp = 0;
        this.status = 'None';
        this.speed = 1/20000;

    },
    startOnPath: function ()
    {
        // set the t parameter at the start of the path
        this.follower.t = 0;
        this.hp = 75;
        
        // get x and y of the given t point            
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
    },
    setStatus: function(status, tint) {
        this.status = status;
        this.setTint(tint);
    },
    restoreSpeed: function() {
        this.speed = 1/30000;
    },
    push: function() {
        var that = this;
        that.speed = 1/10000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    pull: function() {
        var that = this;
        that.speed = -1/20000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    stun: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 2000);
    },
    slow: function() {
        var that = this;
        that.speed = 1/45000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 1000);
    },
    freeze: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 3000);
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

var Enemy7 = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('wraithEnemyHard');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.bounty = 7;
        this.hp = 0;
        this.status = 'None';
        this.speed = 1/15000;

    },
    startOnPath: function ()
    {
        // set the t parameter at the start of the path
        this.follower.t = 0;
        this.hp = 75;
        
        // get x and y of the given t point            
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
    },
    setStatus: function(status, tint) {
        this.status = status;
        this.setTint(tint);
    },
    restoreSpeed: function() {
        this.speed = 1/30000;
    },
    push: function() {
        var that = this;
        that.speed = 1/10000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    pull: function() {
        var that = this;
        that.speed = -1/20000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    stun: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 2000);
    },
    slow: function() {
        var that = this;
        that.speed = 1/45000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 1000);
    },
    freeze: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 3000);
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

var Enemy8 = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('golemEnemyHard');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.bounty = 8;
        this.hp = 0;
        this.status = 'None';
        this.speed = 1/15000;

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
    setStatus: function(status, tint) {
        this.status = status;
        this.setTint(tint);
    },
    restoreSpeed: function() {
        this.speed = 1/30000;
    },
    push: function() {
        var that = this;
        that.speed = 1/10000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    pull: function() {
        var that = this;
        that.speed = -1/20000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    stun: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 2000);
    },
    slow: function() {
        var that = this;
        that.speed = 1/45000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 1000);
    },
    freeze: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 3000);
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

var Enemy9 = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('minotaurEnemyHard');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.bounty = 9;
        this.hp = 0;
        this.status = 'None';
        this.speed = 1/15000;

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
    setStatus: function(status, tint) {
        this.status = status;
        this.setTint(tint);
    },
    restoreSpeed: function() {
        this.speed = 1/30000;
    },
    push: function() {
        var that = this;
        that.speed = 1/10000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    pull: function() {
        var that = this;
        that.speed = -1/20000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 500);
    },
    stun: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 2000);
    },
    slow: function() {
        var that = this;
        that.speed = 1/45000;
        setTimeout(function() {
            that.restoreSpeed();
        }, 1000);
    },
    freeze: function() {
        var that = this;
        that.speed = 0;
        setTimeout(function() {
            that.restoreSpeed();
        }, 3000);
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

/***************************
TOWER CLASSES
FIRE
WATER
WIND
ICE
ELECTRIC
****************************/
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
        var enemy4 = getEnemy4(this.x, this.y, this.range);
        var enemy5 = getEnemy5(this.x, this.y, this.range);
        var enemy6 = getEnemy6(this.x, this.y, this.range);
        var enemy7 = getEnemy7(this.x, this.y, this.range);
        var enemy8 = getEnemy8(this.x, this.y, this.range);
        var enemy9 = getEnemy9(this.x, this.y, this.range);
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

        if(enemy4) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Fire', this.dmg);
        }

        if(enemy5) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Fire', this.dmg);
        }

        if(enemy6) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Fire', this.dmg);
        }

        if(enemy7) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Fire', this.dmg);
        }

        if(enemy8) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Fire', this.dmg);
        }

        if(enemy9) {
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
        this.dmg = 3;
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
        var enemy4 = getEnemy4(this.x, this.y, this.range);
        var enemy5 = getEnemy5(this.x, this.y, this.range);
        var enemy6 = getEnemy6(this.x, this.y, this.range);
        var enemy7 = getEnemy7(this.x, this.y, this.range);
        var enemy8 = getEnemy8(this.x, this.y, this.range);
        var enemy9 = getEnemy9(this.x, this.y, this.range);

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

        if(enemy4) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, 'Water', this.dmg);
        }

        if(enemy5) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy2.x, enemy2.y);
            addBullet(this.x, this.y, angle, 'Water', this.dmg);
        }

        if(enemy6) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Water', this.dmg);
        }

        if(enemy7) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, 'Water', this.dmg);
        }

        if(enemy8) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy2.x, enemy2.y);
            addBullet(this.x, this.y, angle, 'Water', this.dmg);
        }

        if(enemy9) {
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
        this.dmg = 1;
        this.upgradeCost = (this.level * 2 * WINDCOST);
        this.sellVal = Math.round((WINDCOST / 2));
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
            this.upgradeCost = (this.level * 2 * WINDCOST);
            this.sellVal = Math.round((this.level * WINDCOST) / 2);
        }
    },

    fire: function() {
        var enemy = getEnemy(this.x, this.y, this.range);
        var enemy2 = getEnemy2(this.x, this.y, this.range);
        var enemy3 = getEnemy3(this.x, this.y, this.range);
        var enemy4 = getEnemy3(this.x, this.y, this.range);
        var enemy5 = getEnemy3(this.x, this.y, this.range);
        var enemy6 = getEnemy3(this.x, this.y, this.range);
        var enemy7 = getEnemy3(this.x, this.y, this.range);
        var enemy8 = getEnemy3(this.x, this.y, this.range);
        var enemy3 = getEnemy3(this.x, this.y, this.range);
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

        if(enemy4) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, 'Wind', this.dmg);
        }

        if(enemy5) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy2.x, enemy2.y);
            addBullet(this.x, this.y, angle, 'Wind', this.dmg);
        }

        if(enemy6) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Wind', this.dmg);
        }

        if(enemy7) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, 'Wind', this.dmg);
        }

        if(enemy8) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy2.x, enemy2.y);
            addBullet(this.x, this.y, angle, 'Wind', this.dmg);
        }

        if(enemy9) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Wind', this.dmg);
        }
    },

    update: function(time, delta) {
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 4000;
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
        this.upgradeCost = (this.level * 2 * ICECOST);
        this.sellVal = Math.round((ICECOST / 2));
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
            this.upgradeCost = (this.level * 2 * ICECOST);
            this.sellVal = Math.round((this.level * ICECOST) / 2);
        }
    },

    fire: function() {
        var enemy = getEnemy(this.x, this.y, this.range);
        var enemy2 = getEnemy2(this.x, this.y, this.range);
        var enemy3 = getEnemy3(this.x, this.y, this.range);
        var enemy4 = getEnemy3(this.x, this.y, this.range);
        var enemy5 = getEnemy3(this.x, this.y, this.range);
        var enemy6 = getEnemy3(this.x, this.y, this.range);
        var enemy7 = getEnemy3(this.x, this.y, this.range);
        var enemy8 = getEnemy3(this.x, this.y, this.range);
        var enemy9 = getEnemy3(this.x, this.y, this.range);

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

        if(enemy4) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, 'Ice', this.dmg);
        }

        if(enemy5) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy2.x, enemy2.y);
            addBullet(this.x, this.y, angle, 'Ice', this.dmg);
        }

        if(enemy6) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Ice', this.dmg);
        }

        if(enemy7) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, 'Ice', this.dmg);
        }

        if(enemy8) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy2.x, enemy2.y);
            addBullet(this.x, this.y, angle, 'Ice', this.dmg);
        }

        if(enemy9) {
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
        this.upgradeCost = (this.level * 2 * ELECCOST);
        this.sellVal = Math.round((ELECCOST / 2));
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
            this.upgradeCost = (this.level * 2 * ELECCOST);
            this.sellVal = Math.round((this.level * ELECCOST) / 2);
        }
    },

    fire: function() {
        var enemy = getEnemy(this.x, this.y, this.range);
        var enemy2 = getEnemy2(this.x, this.y, this.range);
        var enemy3 = getEnemy3(this.x, this.y, this.range);
        var enemy4 = getEnemy3(this.x, this.y, this.range);
        var enemy5 = getEnemy3(this.x, this.y, this.range);
        var enemy6 = getEnemy3(this.x, this.y, this.range);
        var enemy7 = getEnemy3(this.x, this.y, this.range);
        var enemy8 = getEnemy3(this.x, this.y, this.range);
        var enemy9 = getEnemy3(this.x, this.y, this.range);

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

        if(enemy4) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, 'Electric', this.dmg);
        }

        if(enemy5) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy2.x, enemy2.y);
            addBullet(this.x, this.y, angle, 'Electric', this.dmg);
        }

        if(enemy6) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy3.x, enemy3.y);
            addBullet(this.x, this.y, angle, 'Electric', this.dmg);
        }

        if(enemy7) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, 'Electric', this.dmg);
        }

        if(enemy8) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy2.x, enemy2.y);
            addBullet(this.x, this.y, angle, 'Electric', this.dmg);
        }

        if(enemy9) {
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


/********************************************
BULLET CLASS
CONSTRUCTOR ALLOWS DYNAMIC ELEMENTAL CHANGES
*********************************************/

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
            this.speed = Phaser.Math.GetSpeed(300, 1);
        }
        if(this.element == 'Water') {
            this.setTexture('imgWaterBullet');
            this.speed = Phaser.Math.GetSpeed(600, 1);
        }
        if(this.element == 'Wind') {
            this.setTexture('imgWindBullet');
            this.speed = Phaser.Math.GetSpeed(400, 1);
        }
        if(this.element == 'Ice') {
            this.setTexture('imgIceBullet');
            this.speed = Phaser.Math.GetSpeed(500, 1);
        }
        if(this.element == 'Electric') {
            this.setTexture('imgElecBullet');
            this.speed = Phaser.Math.GetSpeed(600, 1);
        }

        this.setActive(true);
        this.setVisible(true);
        this.setPosition(x, y);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);
        this.setRotation(angle);

        this.lifespan = 600;
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

var Tree = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function Tree (scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setPosition(x, y);
        this.setTexture('tree1');
        this.setScale(.3);
        this.setDepth(-1);
        this.setInteractive();
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },
});

var Tree2 = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function Tree2 (scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setPosition(x, y);
        this.setTexture('tree2');
        this.setScale(.35);
        this.setDepth(-1);
        this.setInteractive();
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },
});

var Tree3 = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function Tree3 (scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setPosition(x, y);
        this.setTexture('tree3');
        this.setScale(.5);
        this.setDepth(-1);
        this.setInteractive();
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },
});

var Rock = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function Rock (scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setPosition(x, y);
        this.setTexture('rock1');
        this.setScale(1);
        this.setDepth(-1);
        this.setInteractive();
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },
});

var Rock2 = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function Rock (scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setPosition(x, y);
        this.setTexture('rock2');
        this.setScale(1);
        this.setDepth(-1);
        this.setInteractive();
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },
});

var Rock3 = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function Rock (scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setPosition(x, y);
        this.setTexture('rock3');
        this.setScale(1);
        this.setDepth(-1);
        this.setInteractive();
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },
});

var Rock4 = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function Rock (scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setPosition(x, y);
        this.setTexture('rock4');
        this.setScale(1);
        this.setDepth(-1);
        this.setInteractive();
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },
});

var Rock5 = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,
    initialize:

    function Rock (scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setPosition(x, y);
        this.setTexture('rock5');
        this.setScale(1);
        this.setDepth(-1);
        this.setInteractive();
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },
});