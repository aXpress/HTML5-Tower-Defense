var enemies;
var path;

var wave1 = 5;
var wave2 = 10;
var wave3 = 15;
var LevelThree = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function LevelThree ()
    {
        Phaser.Scene.call(this, { key: 'LevelThree' });
    },

    preload: function ()
    {
        this.load.image('imgMainMenuButton', 'src/assets/imgMainMenuButton.png');
        this.load.image('wraithEnemy', 'src/assets/enemies/wraith.png');
    },

    create: function ()
    {
        this.add.text(20, 20, "Level Three");

        var mainMenuButton = this.add.sprite(1500, 50, 'imgMainMenuButton');
        mainMenuButton.setInteractive().on('pointerover', function(event) {this.setTint(0xC0C0C0);});
        mainMenuButton.setInteractive().on('pointerout', function(event) {this.clearTint();});
        mainMenuButton.setInteractive().on('pointerdown', function() {this.scene.start('MainMenu')}, this);

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

        enemies = this.add.group({ classType: Enemy, runChildUpdate: true });
	    this.nextEnemy = 0;
    },
    update: function(time, delta)
    {
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
                enemy.setActive(true);
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
                enemy.setActive(true);
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
    }

});

var Enemy = new Phaser.Class({
 
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

