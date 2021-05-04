var MapCreation = new Phaser.Class({


    Extends: Phaser.Scene,

    initialize:

    function MapCreation ()
    {
        Phaser.Scene.call(this, { key: 'MapCreation' });
    },

    preload: function ()
    {
        this.load.image('imgMainMenuButton', 'src/assets/imgMainMenuButton.png');
    },

    create: function ()
    {
        //var game = new Phaser.Game(800,600, Phaser.AUTO);
        var size = 50;
        var rockSize = 100;
        var treeSize = 100;
        var points;
        var handles;
        var parts = 8;
        var height = this.scale.height;
        var width = this.scale.width;
        var butWidth = 75;
        var butHeight = 35;
        var message = "Drag starting node to desired location, then click 'Path' to start placing nodes.";
        var message2 = "If you want to delete a node, hold down the 'X' button and click on a node.";
        var delKey = this.input.keyboard.addKey('X');
        var picKey = this.input.keyboard.addKey('P');
        var curBut = '';

        var rt = this.add.renderTexture(0,0,width,height);

        path = { t: 0, vec: new Phaser.Math.Vector2() };

        this.add.text(20, 20, message);
        this.add.text(20, 50, message2);

        // main menu button.
        var mainMenuButton = this.add.sprite(1500, 50, 'imgMainMenuButton');
        mainMenuButton.setInteractive().on('pointerover', function(event) {this.setTint(0xC0C0C0);});
        mainMenuButton.setInteractive().on('pointerout', function(event) {this.clearTint();});
        mainMenuButton.setInteractive().on('pointerdown', function() {this.scene.start('MainMenu')}, this);

        // Menu container for the build buttons.
        var butContainer = this.add.container(1500,105);

        // Path menu Button.
        var pathButton = this.add.rectangle(0, 0, butWidth, butHeight, 0xffffff);
        var pathText = this.add.text(0, 0, "Path",{font: '18pt Arial', fill: '0xffffff'});
        pathText.setOrigin(0.5,0.5);
        //pathButton.name
        pathButton.setStrokeStyle(5,0xff0000);
        pathButton.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        pathButton.setInteractive().on('pointerout', function(event) {this.setFillStyle(0xffffff, 1);});
        pathButton.setInteractive().on('pointerdown', function(event) {
            curBut = 'path';
            changeActive(this.parentContainer.list);
            this.setStrokeStyle(5,0xffbb00);
            });

        // Rock menu button
        var rockButton = this.add.rectangle(0, 50, butWidth, butHeight, 0xffffff);
        var rockText = this.add.text(0, 50, "Rock",{font: '18pt Arial', fill: '0xffffff'});
        rockText.setOrigin(0.5,0.5);
        rockButton.setStrokeStyle(5,0xff0000);
        rockButton.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        rockButton.setInteractive().on('pointerout', function(event) {this.setFillStyle(0xffffff, 1);});
        rockButton.setInteractive().on('pointerdown', function(event) {
            curBut = 'rock';
            changeActive(this.parentContainer.list);
            this.setStrokeStyle(5,0xffbb00);
            });

        // Tree menu Button
        var treeButton = this.add.rectangle(0, 100, butWidth, butHeight, 0xffffff);
        var treeText = this.add.text(0, 100, "Tree",{font: '18pt Arial', fill: '0xffffff'});
        treeText.setOrigin(0.5,0.5);
        treeButton.setStrokeStyle(5,0xff0000);
        treeButton.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        treeButton.setInteractive().on('pointerout', function(event) {this.setFillStyle(0xffffff, 1);});
        treeButton.setInteractive().on('pointerdown', function(event) {
            curBut = 'tree';
            changeActive(this.parentContainer.list);
            this.setStrokeStyle(5,0xffbb00);
            });

        // Water menu Button
        var waterButton = this.add.rectangle(0, 150, butWidth, butHeight, 0xffffff);
        var waterText = this.add.text(0, 150, "Water",{font: '18pt Arial', fill: '0xffffff'});
        waterText.setOrigin(0.5,0.5);
        waterButton.setStrokeStyle(5,0xff0000);
        waterButton.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        waterButton.setInteractive().on('pointerout', function(event) {this.setFillStyle(0xffffff, 1);});
        waterButton.setInteractive().on('pointerdown', function(event) {
            curBut = 'water';
            changeActive(this.parentContainer.list);
            this.setStrokeStyle(5,0xffbb00);
            });

        butContainer.add(pathButton);
        butContainer.add(pathText);
        butContainer.add(rockButton);
        butContainer.add(rockText);
        butContainer.add(treeButton);
        butContainer.add(treeText);
        butContainer.add(waterButton);
        butContainer.add(waterText);


        // helper function for menu buttons. Changes the outline color.
        var changeActive = function (pointer)
        {
            {
                for(var i = 0; i < pointer.length; i++)
                {
                    if(pointer[i].strokeColor == 16759552)
                    {
                        pointer[i].setStrokeStyle(5,0xff0000);
                    }
                }
            }
        }



        curve = new Phaser.Curves.Spline([ new Phaser.Math.Vector2(0,450) ]);

        var _this = this;
        var startingPoint = null;
        //var data = [ 0,20, 120,50, 200,100];

        //var r1 = this.add.polygon(200, 200, data, 0xbdbdbd);
        var makeTree = function (x, y)
        {
            var tree = _this.add.circle(x, y, treeSize, 0x175c10).setInteractive();
            
            tree.setStrokeStyle(3, 0x10360c);
            _this.input.setDraggable(tree);

        }

        var makeRock = function (x, y)
        {
            var p = {};
            p.x = x;
            p.y = y;
            //var pieces = Phaser.Math.Between(3, 6);
            var rSize = rockSize / 2;

            var top = 0;//p.y - rSize;
            var bot = rockSize;//p.y + rSize;
            var left = 0;//p.x - rSize;
            var right = rockSize;//p.x + rSize;
            var data = [];

            var x;
            var y;

            // top edge
            x = rSize - Phaser.Math.Between(0, rSize);
            y = top + Phaser.Math.Between(-5, 5);
            data.push(x);
            data.push(y);
            x = rSize + Phaser.Math.Between(0, rSize);
            y = top + Phaser.Math.Between(-5, 5);
            data.push(x);
            data.push(y);

            // right edge
            x = right + Phaser.Math.Between(-5, 5);
            y = rSize - Phaser.Math.Between(0, rSize);
            data.push(x);
            data.push(y);
            y = rSize + Phaser.Math.Between(0, rSize);
            x = right + Phaser.Math.Between(-5, 5);
            data.push(x);
            data.push(y);

            // bottom edge
            x = rSize + Phaser.Math.Between(0, rSize);
            y = bot + Phaser.Math.Between(-5, 5);
            data.push(x);
            data.push(y);
            x = rSize - Phaser.Math.Between(0, rSize);
            y = bot + Phaser.Math.Between(-5, 5);
            data.push(x);
            data.push(y);

            // left edge
            x = left + Phaser.Math.Between(-5, 5);
            y = rSize + Phaser.Math.Between(0, rSize);
            data.push(x);
            data.push(y);
            x = left + Phaser.Math.Between(-5, 5);
            y = rSize - Phaser.Math.Between(0, rSize);
            data.push(x);
            data.push(y);

            var r1 = _this.add.polygon(p.x, p.y, data, 0xbdbdbd).setInteractive();
            _this.input.setDraggable(r1);

            r1.setStrokeStyle(3, 0x636363);
        }


        var createPointHandle = function (point)
        {
            var handle = _this.add.circle(point.x, point.y, 15, 0xbf47ff).setInteractive();

            handle.setData('vector', point);

            _this.input.setDraggable(handle);

            //points = curve.getDistancePoints(32);
            //curve = new Phaser.Curves.Spline(points);
            
            if(startingPoint == null)
            {
                handle.name = 'startingPoint';
                startingPoint = handle;
            }
        };

        var removePointHandle = function (gameObjects)
        {
            //console.log(gameObjects[0].data.list.vector);
            //console.log(curve.points);
            for(var i = 0; i < curve.points.length; i++)
            {
                if(curve.points[i] == gameObjects[0].data.list.vector)
                {
                    gameObjects[0].destroy();
                    curve.points.splice(i, 1);

                }
            }
            //gameObjects[0].destroy();
        }

        createPointHandle(curve.points[0]);


        this.input.on('pointerdown', function(pointer, gameObjects)
        {
            if (delKey.isDown)
            {
                if(gameObjects.length == 0)
                    return;
                
                removePointHandle(gameObjects);
            }
            else if (curBut == 'rock')
            {
                if(gameObjects.length > 0)
                    return;

                makeRock(pointer.x, pointer.y);
            }
            else if (curBut == 'tree')
            {
                if(gameObjects.length > 0)
                    return;

                makeTree(pointer.x, pointer.y);
            }
            else if (curBut == 'path')
            {
                if (gameObjects.length > 0)
                {
                    //console.log("checking");
                    return;
                }
    
                var vec = curve.addPoint(pointer.x, pointer.y);

                createPointHandle(vec);

                

                parts +=8;

                tween.stop();

                path.t = 0;

                tween = _this.tweens.add({
                    targets: path,
                    t: 1,
                    ease: 'Linear',
                    //duration: 500 * (curve.points.length + 1),
                    duration: 500 * (curve.points.length + 1),
                    //yoyo: false,
                    repeat: -1
                }); 
            }
        });
        
        // This creates a screenshot of the map. Right now it is just for testing. At some
        // point we will automatically save this map screenshot when the user is saving it.
        window.onkeydown = function (e)
        {
            console.log(e.keyCode);
             if(e.keyCode == 80)
            {
                _this.renderer.snapshot(function (image) 
                {
                    image.style.width = '400px';
                    image.style.height = '225px';
                    image.style.paddingLeft = '2px';
                    //snapHistory.push(image);
                    console.log('snap!');
                    document.body.appendChild(image);
                })
            }
        };


        this.input.on('dragstart', function (pointer, gameObject) 
        {
            
        });



        this.input.on('drag', function (pointer, gameObject, dragX, dragY) 
        {
            var left = 0 + dragX; 
            var right = width - dragX;
            var top = 0 + dragY;
            var bottom = height - dragY;

            //gameObject.x = dragX;
            //gameObject.y = dragY;
            
            if(gameObject.name == 'startingPoint')
            {
                var left = 0 + dragX; 
                var right = width - dragX;
                var top = 0 + dragY;
                var bottom = height - dragY;

                //console.log(left, right, top, bottom);

                if((left < right) && (left < top) && (left < bottom))
                {
                    gameObject.x = 0;
                    gameObject.y = dragY;
                }
                else if((right < left) && (right < top) && (right < bottom))
                {
                    gameObject.x = width;
                    gameObject.y = dragY;
                }
                else if((top < left) && (top < right) && (top < bottom))
                {
                    gameObject.x = dragX;
                    gameObject.y = 0;
                }
                else
                {
                    gameObject.x = dragX;
                    gameObject.y = height;
                }
            }
            else
            {
                if(left < 60)
                {
                    gameObject.x = 0;
                    gameObject.y = dragY;
                }
                else if(right < 60)
                {
                    gameObject.x = width;
                    gameObject.y = dragY;
                }
                else if(top < 60)
                {
                    gameObject.x = dragX;
                    gameObject.y = 0;
                }
                else if(bottom < 60)
                {
                    gameObject.x = dragX;
                    gameObject.y = height;
                }
                else
                {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                }
            }


            //console.log(gameObject);
            if(gameObject.data != null)
                gameObject.data.get('vector').set(gameObject.x, gameObject.y);
            
            
        });
    
        this.input.on('dragend', function (pointer, gameObject) 
        {
                //gameObject.setFrame(2);

                //gameObject.setFrame(0);

        });
        

        points = curve.getDistancePoints(100);
        graphics = this.add.graphics();
        //console.log(curve);
        //console.log(path);

        var tween = this.tweens.add({
            targets: path,
            t: 1,
            ease: 'Linear',
            duration: 5000,
            yoyo: false,
            repeat: -1
        }); 
    },

    update: function()
    {
        points = curve.getDistancePoints(32);
        graphics.clear();
        //graphics.getPoints(100);

        //  Draw the curve through the points
        graphics.lineStyle(50, 0xFFE599, 1);
        //console.log(graphics);
        //graphics.fillCircleShape(point0);

        curve.draw(graphics, 100);
        //curve2.draw(graphics);

        //  Draw t
        //curve.getPoints(100);
        curve.getPoint(path.t, path.vec);
        //console.log(curve.getPoint(path.t, path.vec));

        graphics.fillStyle(0x000000, 1);
        //graphics.fillCircle(path.vec.x, path.vec.y, 10);
        graphics.fillCircle(path.vec.x, path.vec.y, 10);

        graphics.fillStyle(0xbf47ff, 1);
        for (var i = 0; i < points.length; i++)
        {
            var p = points[i];
            graphics.fillCircle(p.x,p.y, 5);
        }

        //graphics.moveTo(curve2);
    }
});

