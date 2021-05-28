//import { MainMenuButton } from '../script/MainMenuButton';
var fireTowers;
var waterTowers;
var windTowers;
var iceTowers;
var elecTowers;
var firstWaveEnemies;
var secondWaveEnemies;
var thirdWaveEnemies
var bullets;
var curBut ='None';

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
        this.load.image('imgBullet', 'src/assets/towers/bullet.png');
        this.load.image('imgBottomUI', 'src/assets/imgBottomUI.png');
        this.load.image('imgBottomLeftUI', 'src/assets/imgBottomLeftUI.png');
        this.load.image('wraithEnemy', 'src/assets/enemies/wraith.png');
        this.load.image('golemEnemy', 'src/assets/enemies/golem.png');
        this.load.image('minotaur', 'src/assets/enemies/minotaur.png');
    },

    create: function() {
        this.add.text(20, 20, "Level Two");
        this.add.text(20, 35, "curBut: ");
        var currentBtn = this.add.text(100, 35, "None");

        var mainMenuButton = this.add.sprite(1500, 50, 'imgMainMenuButton').setInteractive()
        .on('pointerover', () => mainMenuButton.setTint(0xC0C0C0))
        .on('pointerout', () => mainMenuButton.clearTint())
        .on('pointerdown', () => this.scene.start('MainMenu'), this);

        var bottomUI = this.add.sprite(950, 825, 'imgBottomUI').setInteractive()
        bottomUI.depth = -1;
        var bottomLeftUI = this.add.sprite(150, 825, 'imgBottomLeftUI').setInteractive()
        bottomUI.depth = -1;

        var goldText = this.add.text(45, 785, "GOLD :",{font: '18pt pixel', fill: '0xffffff'});
        var waveText = this.add.text(45, 835, "WAVE :",{font: '18pt pixel', fill: '0xffffff'});

        // this graphics element is only for visualization, 
        // its not related to our path
        var graphics = this.add.graphics();    
        
        // the path for our enemies
        // parameters are the start x and y of our path
        path = this.add.path(0, 450);
        path.lineTo(450, 450);
        path.lineTo(450, 600);
        path.lineTo(1600, 600);
        
        graphics.lineStyle(3, 0xffffff, 1);
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

        var noneBtn = this.add.rectangle(1000, 0, 150, 35, 0x8AFFFD);
        var noneBtnTxt = this.add.text(1000, 0, "None",{font: '18pt pixel', fill: '0xffffff'});
        noneBtnTxt.setOrigin(0.5,0.5);
        noneBtn.setStrokeStyle(5,0xff0000);
        noneBtn.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        noneBtn.setInteractive().on('pointerout', function(event) {this.setFillStyle(0x8AFFFD, 1);});
        noneBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'None';
            currentBtn.setText('None');
        });

        var enemyBtn = this.add.rectangle(1000, -50, 150, 35, 0x8AFFFD);
        var enemyBtnTxt = this.add.text(1000, -50, "Enemy",{font: '18pt pixel', fill: '0xffffff'});
        enemyBtnTxt.setOrigin(0.5,0.5);
        enemyBtn.setStrokeStyle(5,0xff0000);
        enemyBtn.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        enemyBtn.setInteractive().on('pointerout', function(event) {this.setFillStyle(0x8AFFFD, 1);});
        enemyBtn.setInteractive().on('pointerdown', function(event) {
            curBut = 'Enemy';
            currentBtn.setText('Enemy');
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
        towerContainer.add(enemyBtn);
        towerContainer.add(enemyBtnTxt);

        fireTowers = this.add.group({classType: FireTower, runChildUpdate: true});
        waterTowers = this.add.group({classType: WaterTower, runChildUpdate: true});
        windTowers = this.add.group({classType: WindTower, runChildUpdate: true});
        iceTowers = this.add.group({classType: IceTower, runChildUpdate: true});
        elecTowers = this.add.group({classType: ElecTower, runChildUpdate: true});
        firstWaveEnemies = this.physics.add.group({classType: Enemy1, runChildUpdate: true});
        secondWaveEnemies = this.physics.add.group({classType: Enemy2, runChildUpdate: true});
        thirdWaveEnemies = this.physics.add.group({classType: Enemy3, runChildUpdate: true});
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
            else if (curBut == 'fireTower') {
                var fireTower = fireTowers.get();
                fireTower.place(pointer.x, pointer.y);
                fireTower.setInteractive();
            }
            else if (curBut == 'waterTower') {
                var waterTower = waterTowers.get();
                waterTower.place(pointer.x, pointer.y);
                waterTower.setInteractive();
            }
            else if (curBut == 'windTower') {
                var windTower = windTowers.get();
                windTower.place(pointer.x, pointer.y);
                windTower.setInteractive();
            }
            else if (curBut == 'iceTower') {
                var iceTower = iceTowers.get();
                iceTower.place(pointer.x, pointer.y);
                iceTower.setInteractive();
            }
            else if (curBut == 'elecTower') {
                var elecTower = elecTowers.get();
                elecTower.place(pointer.x, pointer.y);
                elecTower.setInteractive();
            }
            else if (curBut == 'Enemy') {
                var enemy = enemies.get();
                enemy.place(pointer.x, pointer.y);
                enemy.setInteractive();
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

    },

    update: function(time, delta) {
        if (time > this.nextEnemy && wave1 > 0)
        {
            var enemy = enemies.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 3000;
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

                this.nextEnemy = time + 10000;
                wave1--;
            }
        }

        if (time > this.nextEnemy && wave2 > 0 && wave1 == -1)
        {
            var enemy = enemies.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 2000;
                wave2--;
            }
        }

        if (wave2 == 0) {
            var enemy = enemies.get();
            if (enemy)
            {
                enemy.setActive(false);
                enemy.setVisible(false);
                enemy.startOnPath();

                this.nextEnemy = time + 10000;
                wave2--;
            }


        }

        if (time > this.nextEnemy && wave3 > 0 && wave2 == -1)
        {
            var enemy = enemies.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 1000;
                wave3--;
            }
        }
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

function damageEnemy(enemy, bullet) {  
    // only if both enemy and bullet are alive
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        // bullet.setActive(false);
        // bullet.setVisible(false);
        bullet.consume();
        
        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(50);
    }
}

function addBullet(x, y, angle) {
    var bullet = bullets.get();
    if (bullet)
    {
        bullet.fire(x, y, angle);
    }
}

var Enemy1 = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('wraithEnemy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
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
        this.time.delayedCall(2000, restoreSpeed, null, this);
    },
    pull: function() {
        this.speed = -1/100000;
        this.time.delayedCall(2000, restoreSpeed, null, this);
    },
    stun: function() {
        this.speed = 0;
        this.time.delayedCall(2000, restoreSpeed, null, this);
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
        }

    }

});

var Enemy2 = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('wraithEnemy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
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
        this.time.delayedCall(2000, restoreSpeed, null, this);
    },
    pull: function() {
        this.speed = -1/100000;
        this.time.delayedCall(2000, restoreSpeed, null, this);
    },
    stun: function() {
        this.speed = 0;
        this.time.delayedCall(2000, restoreSpeed, null, this);
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
        }

    }

});

var Enemy3 = new Phaser.Class({
 
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('wraithEnemy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
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
        this.time.delayedCall(2000, restoreSpeed, null, this);
    },
    pull: function() {
        this.speed = -1/100000;
        this.time.delayedCall(2000, restoreSpeed, null, this);
    },
    stun: function() {
        this.speed = 0;
        this.time.delayedCall(2000, restoreSpeed, null, this);
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
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    },

    fire: function() {
        var enemy = getEnemy(this.x, this.y, 200);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle);
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

    function FireTower (scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgWaterTower');
        this.setPosition(x, y);
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    }
});

var WindTower = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,

    initialize:

    function FireTower (scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgWindTower');
        this.setPosition(x, y);
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    }
});

var IceTower = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,

    initialize:

    function FireTower (scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgIceTower');
        this.setPosition(x, y);
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    }
});

var ElecTower = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,

    initialize:

    function FireTower (scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgElecTower');
        this.setPosition(x, y);
    },

    place: function(i, j) {
        this.x = i;
        this.y = j;
    }
});

var Bullet = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0);
        this.setTexture('imgBullet');
        this.incX = 0;
        this.incY = 0;
        this.lifespan = 0;
        this.speed = Phaser.Math.GetSpeed(600, 1);
    },

    fire: function (x, y, angle, towerType)
    {
        this.element = towerType;
        this.setActive(true);
        this.setVisible(true);
        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x, y);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifespan = 1000;
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
