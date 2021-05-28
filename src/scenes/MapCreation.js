/*---------------------------------------------------------------------------**
** Description: Map creation js file. This file contains all the code for 
**              creating levels. The user can place rocks, trees, and paths.
**              There is a message system that acts as a sort of First Time
**              user experience. It walks the user through the steps of
**              creating and submitting their map creation.
**              The user can then submit their map creation and it is saved
**              in a folder in the server.
**-----------------------------------------------------------------------------
** Authors: Troy Holt, Abraham Cheng, Eric Johnson
** OSU CS 467 Capstone Project
** Spring 2021
**---------------------------------------------------------------------------*/


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

    create: function ()
    {
        var size = 50;
        var rockSize = 3;
        var treeSize = 1;
        var points;
        var mapObjects = {};
        var handles;
        var parts = 8;
        var height = this.scale.height;
        var width = this.scale.width;
        var butWidth = 75;
        var butHeight = 35;
        var delKey = this.input.keyboard.addKey('X');
        var picKey = this.input.keyboard.addKey('P');
        var curBut = '';
        var curRock = 1;
        var curTree = 1;
        var curCursor;
        var levelName = 'My first level';
        var trees = [];
        var rocks = [];

        var rt = this.add.renderTexture(0,0,width,height);

        path = { t: 0, vec: new Phaser.Math.Vector2() };

        this.groupUI = this.add.group();
        var groupUI = this.groupUI;

        var message = this.add.text(20, 20, "");
        var message2 = this.add.text(20, 50, "");
        var message3 = this.add.text(20, 80, "");

        /*---------------------------------------------------------------------
        ** Message function. This takes a string arg and changes the message
        ** that is dispalyed at the top of the screen.
        ---------------------------------------------------------------------*/
        var messageTop = function (mesTop){
            message.text = mesTop;
        }

        var messageBot = function (mesBot){
            message2.text = mesBot;
        }

        var messageExt = function (mesExt){
            message3.text = mesExt;
        }

        messageTop("Welcome to the Map creator. Build paths, rocks, and trees to your hearts content.");
        messageBot("A starting node has been placed for you. Drag it to where you want bad guys to spawn.");
        messageExt("Notice that it is locked to the edges. Bad guys must come and leave from the edges of the map.");
        
        /*---------------------------------------------------------------------
        ** These are the setup for the buttons. This allows the user to
        ** navigate back to the main menu and also pick which elements they
        ** want to place on the map.
        ---------------------------------------------------------------------*/

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
            messageTop("Drag starting node to desired location, then click 'Path' to start placing nodes.");
            messageBot("If you want to delete a node, hold down the 'X' button and click on a node.");
            messageExt("");
            });

        // Rock menu button
        var rockButton = this.add.rectangle(0, 50, butWidth, butHeight, 0xffffff);
        var rockText = this.add.text(0, 50, "Rock",{font: '18pt Arial', fill: '0xffffff'});
        rockText.setOrigin(0.5,0.5);
        rockButton.setStrokeStyle(5,0xff0000);
        rockButton.name = 'button';
        rockButton.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        rockButton.setInteractive().on('pointerout', function(event) {this.setFillStyle(0xffffff, 1);});
        rockButton.setInteractive().on('pointerdown', function(event) {
            curBut = 'rock';
            changeActive(this.parentContainer.list);
            this.setStrokeStyle(5,0xffbb00);
            messageTop("This is the rock creation button. Holding x while clicking a rock will delete it.");
            messageBot("Q and E keys will change the rock. A and D keys will change the size.");
            messageExt("");
            });

        // Tree menu Button
        var treeButton = this.add.rectangle(0, 100, butWidth, butHeight, 0xffffff);
        var treeText = this.add.text(0, 100, "Tree",{font: '18pt Arial', fill: '0xffffff'});
        treeText.setOrigin(0.5,0.5);
        treeButton.setStrokeStyle(5,0xff0000);
        treeButton.name = 'button';
        treeButton.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        treeButton.setInteractive().on('pointerout', function(event) {this.setFillStyle(0xffffff, 1);});
        treeButton.setInteractive().on('pointerdown', function(event) {
            curBut = 'tree';
            changeActive(this.parentContainer.list);
            this.setStrokeStyle(5,0xffbb00);
            messageTop("This is the tree creation button. Holding x while clicking a tree will delete it.");
            messageBot("Q and E keys will change the tree. A and D keys will change the size.");
            messageExt("");
            });

        // Submit menu Button. This sends a Post request to the server to save the map.
        var submitButton = this.add.rectangle(0, 150, butWidth, butHeight, 0xffffff);
        var submitText = this.add.text(0, 150, "submit",{font: '18pt Arial', fill: '0xffffff'});
        submitText.setOrigin(0.5,0.5);
        submitButton.setStrokeStyle(5,0xff0000);
        submitButton.setInteractive().on('pointerover', function(event) {this.setFillStyle(0xffffff, .75);});
        submitButton.setInteractive().on('pointerout', function(event) {this.setFillStyle(0xffffff, 1);});
        submitButton.setInteractive().on('pointerdown', function(event) {
            
            curBut = 'submit';
            changeActive(this.parentContainer.list);
            this.setStrokeStyle(5,0xffbb00);

            points = curve.getDistancePoints(32);
            var checker = curve.points[curve.points.length - 1];

            if(points.length < 3)
            {
                messageTop("You must build a path before you can submit the map!");
                messageBot("");
                messageExt("");
                return;
            }
            if((checker.x != 0) && (checker.x != 1600) && (checker.y != 0) && (checker.y != 900))
            {
                messageTop("Your path must end on an edge!");
                messageBot("");
                messageExt("");
                return;
            }

            messageTop("");
            messageBot("");
            messageExt("");

            mapObjects.path = [];
            mapObjects.path.push(points);
            mapObjects.trees = trees;
            mapObjects.rocks = rocks;

            var req = new XMLHttpRequest();
            var url = "http://localhost:8080/test";// + JSON.stringify(mapObjects);
            //console.log(url);
            req.open("POST", url, true);
            req.setRequestHeader('Content-Type','application/json');
            req.addEventListener('load', function()
            {
                if (req.status >= 200 && req.status <= 400)
                {
                    response = req.responseText;
                    response = JSON.parse(response);
                    messageTop("You have successfully created a map!");
                    messageBot("You're map key is: ");
                    messageExt(response);
                }
                else
                {
                    console.log('Error in network request: ' + req.statusText);
                }

                mainMenuButton.setVisible(true);
            });

            req.send(JSON.stringify(mapObjects)); 

            });

        // All the buttons are wrapped in a container. This allows an easy
        // way to check their states and change their visibility.
        butContainer.add(pathButton);
        butContainer.add(pathText);
        butContainer.add(rockButton);
        butContainer.add(rockText);
        butContainer.add(treeButton);
        butContainer.add(treeText);
        butContainer.add(submitButton);
        butContainer.add(submitText);

        // grass layer.
        this.add.rectangle(width/2, height/2, width, height, 0x032405).setDepth(-4);

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

        /*---------------------------------------------------------------------
        ** Function for placing a tree. It uses the X and Y coordinate of the
        ** mouse pointer.
        ---------------------------------------------------------------------*/
        var makeTree = function (x, y)
        {
            if(curTree == 1)
            {
                var myImage = _this.add.image(x,y, 'tree1').setScale(treeSize).setInteractive().setDepth(-1);
            }
            else if(curTree == 2)
            {
                var myImage = _this.add.image(x,y, 'tree2').setScale(treeSize).setInteractive().setDepth(-1);
            }
            else if(curTree == 3)
            {
                var myImage = _this.add.image(x,y, 'tree3').setScale(treeSize).setInteractive().setDepth(-1);
            }
            myImage.name = 'tree';
            trees.push(myImage);
        }


        /*---------------------------------------------------------------------
        ** Function for placing a rock. It uses the X and Y coordinate of the
        ** mouse pointer.
        ---------------------------------------------------------------------*/
        var makeRock = function (x, y)
        { 
            if(curRock == 1)
            {
                var myImage = _this.add.image(x,y, 'rock1').setScale(rockSize).setInteractive().setDepth(-2);
            }
            else if(curRock == 2)
            {
                var myImage = _this.add.image(x,y, 'rock2').setScale(rockSize).setInteractive().setDepth(-2);
            }
            else if(curRock == 3)
            {
                var myImage = _this.add.image(x,y, 'rock3').setScale(rockSize).setInteractive().setDepth(-2);
            }
            else if(curRock == 4)
            {
                var myImage = _this.add.image(x,y, 'rock4').setScale(rockSize).setInteractive().setDepth(-2);
            }
            else if(curRock == 5)
            {
                var myImage = _this.add.image(x,y, 'rock5').setScale(rockSize).setInteractive().setDepth(-2);
            }
            myImage.name = 'rock';
            rocks.push(myImage);
        } 

        /*---------------------------------------------------------------------
        ** This creates a point handle. This is used for the path. The path
        ** utilizes a spline system built into phaser that utilizes the points
        ** created to make a spline path. It also makes the points moveable.
        ---------------------------------------------------------------------*/
        var createPointHandle = function (point)
        {
            var handle = _this.add.circle(point.x, point.y, 5, 0x8adaff).setInteractive();

            handle.setData('vector', point);
            handle.setDepth(1);

            _this.input.setDraggable(handle);

            if(startingPoint == null)
            {
                handle.name = 'startingPoint';
                startingPoint = handle;
            }
            else
            {
                handle.name = 'handleBob'
            }


            _this.input.on('pointerover', function (pointer, gameObject)
            {
                if((gameObject[0].name == 'handleBob') || (gameObject[0].name == 'startingPoint'))
                {
                    this.tweens.add({
                        targets: gameObject[0],
                        scale: 4,
                        alpha: .5,
                        duration: 150,
                        ease: 'Linear',
                    });
                }

            }, _this);

            _this.input.on('pointerout', function (pointer, gameObject)
            {
                if((gameObject[0].name == 'handleBob') || (gameObject[0].name == 'startingPoint'))
                {
                    //console.log(gameObject[0].scale);
                    this.tweens.add({
                        targets: gameObject[0],
                        scale: 1,
                        alpha: 1,
                        duration: 150,
                        ease: 'Linear',
                    });
                }
            }, _this);

            groupUI.add(handle);
        };

        /*---------------------------------------------------------------------
        ** This function is for removing a node. This allows you to remove
        ** points along a path.
        ---------------------------------------------------------------------*/
        var removePointHandle = function (gameObjects)
        {
            for(var i = 0; i < curve.points.length; i++)
            {
                if(curve.points[i] == gameObjects[0].data.list.vector)
                {
                    gameObjects[0].destroy();
                    curve.points.splice(i, 1);
                    makePath(curve);

                }
            }
        }

        createPointHandle(curve.points[0]);
        
        // this group stores the path information.
        this.groupA = this.add.group();
        var groupA = this.groupA;
        
        /*---------------------------------------------------------------------
        ** This is the path creation function. It takes the points that the
        ** user created with the point handler, and it creates multiple points
        ** along the spline. It then places a light color of dirt, and then a
        ** darker color of dirt on top. This is what creates the dirt path look.
        ---------------------------------------------------------------------*/
        var makePath = function (p)
        {     
            var points =  p.getDistancePoints(40);
            var pointsb = p.getDistancePoints(20);
            groupA.clear(true, true);

            for (var i = 0; i < points.length; i++)
            {
                var p = points[i];
    
                var myImage = _this.add.image(p.x,p.y, 'pathTextureA').setDepth(-3);
                myImage.setRotation(Phaser.Math.Between(0, 6));
                groupA.add(myImage);
            }
            
            for (var i = 0; i < pointsb.length; i++)
            {
                var p = pointsb[i];
    
                var myImage = _this.add.image(p.x,p.y, 'pathTextureB').setDepth(-3);
                myImage.setRotation(Phaser.Math.Between(0, 6));
                groupA.add(myImage);
            }
        }

        this.groupRock = this.add.group();
        var groupRock = this.groupRock;

        this.groupTree = this.add.group();
        var groupTree = this.groupTree;

        var tree1Cursor = this.add.image(0,0, 'tree1').setVisible(false).setScale(treeSize);
        var tree2Cursor = this.add.image(0,0, 'tree2').setVisible(false).setScale(treeSize);
        var tree3Cursor = this.add.image(0,0, 'tree3').setVisible(false).setScale(treeSize);

        groupTree.addMultiple([tree1Cursor, tree2Cursor, tree3Cursor]);

        var rock1Cursor = this.add.image(0,0, 'rock1').setVisible(false).setScale(rockSize);
        var rock2Cursor = this.add.image(0,0, 'rock2').setVisible(false).setScale(rockSize);
        var rock3Cursor = this.add.image(0,0, 'rock3').setVisible(false).setScale(rockSize);
        var rock4Cursor = this.add.image(0,0, 'rock4').setVisible(false).setScale(rockSize);
        var rock5Cursor = this.add.image(0,0, 'rock5').setVisible(false).setScale(rockSize);

        groupRock.addMultiple([rock1Cursor, rock2Cursor, rock3Cursor, rock4Cursor, rock5Cursor]);

        /*---------------------------------------------------------------------
        ** This handles the input for rocks and trees. It checks the curBut
        ** which is the current button. This function is for switching the
        ** type of rock or tree you are placing.
        ---------------------------------------------------------------------*/
        this.input.on('pointermove', function (pointer) {
            groupRock.setVisible(false);
            groupTree.setVisible(false);

            if (curBut == 'rock')
            {
                if(curRock == 1){
                    rock1Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                }
                else if(curRock == 2){
                    rock2Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                }
                else if(curRock == 3){
                    rock3Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                }
                else if(curRock == 4){
                    rock4Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                }
                else if(curRock == 5){
                    rock5Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                }
            }
            else if (curBut == 'tree')
            {
                if(curTree == 1){
                    tree1Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                }
                else if(curTree == 2){
                    tree2Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                }
                else if(curTree == 3){
                    tree3Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                }
            } 
        })

        /*---------------------------------------------------------------------
        ** This is the pointer down check. This checks if the user clicked
        ** their mouse button and does an action based on where they clicked
        ** and why. 
        ---------------------------------------------------------------------*/
        this.input.on('pointerdown', function(pointer, gameObjects)
        {
            if (delKey.isDown)
            {
                if(gameObjects.length == 0)
                {
                    return;
                }
                else if((curBut == 'rock') && (gameObjects[0].name == 'rock'))
                {
                    gameObjects[0].destroy();
                    return;
                }
                else if((curBut == 'tree') && (gameObjects[0].name == 'tree'))
                {
                    gameObjects[0].destroy();
                    return;
                }
                else if(curBut == 'path')
                {
                    removePointHandle(gameObjects);
                    return
                }
            } 
            else if (curBut == 'rock')
            {
                if(gameObjects.length > 0 && gameObjects[0].name == 'button')
                    return;
                else
                    makeRock(pointer.x, pointer.y);
            }
            else if (curBut == 'tree')
            {
                if(gameObjects.length > 0 && gameObjects[0].name == 'button')
                    return;
                else
                    makeTree(pointer.x, pointer.y);
            }
            else if (curBut == 'path')
            {
                if (gameObjects.length > 0)
                {
                    return;
                }
    
                var vec = curve.addPoint(pointer.x, pointer.y);
                makePath(curve);
                createPointHandle(vec);

                parts +=8;

                tween.stop();

                path.t = 0;

                tween = _this.tweens.add({
                    targets: path,
                    t: 1,
                    ease: 'Linear',
                    duration: 500 * (curve.points.length + 1),
                    repeat: -1
                }); 
            }
        });
        
        /*---------------------------------------------------------------------
        ** This handles keyboard input. This will change which tree/rock is
        ** being placed and the size of each. It also checks if the delete
        ** key is being held down.
        ---------------------------------------------------------------------*/
        window.onkeydown = function (e)
        {
            var pointer = _this.input.mousePointer;
            // this was for testing the picture taking mechanics.
            /*if(e.keyCode == 80)
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
            } */
            if(e.keyCode == 81) // Q key
            {
                groupRock.setVisible(false);
                groupTree.setVisible(false);

                if (curBut == 'rock')
                {
                    if (curRock == 1)
                        curRock = 5;
                    else
                        curRock--;
                    
                    if (curBut == 'rock')
                    {    
                        if(curRock == 1){
                            rock1Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                            curCursor = rock1Cursor;
                        }
                        else if(curRock == 2){
                            rock2Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                            curCursor = rock2Cursor;
                        }
                        else if(curRock == 3){
                            rock3Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                            curCursor = rock3Cursor;
                        }
                        else if(curRock == 4){
                            rock4Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                            curCursor = rock4Cursor;
                        }
                        else if(curRock == 5){
                            rock5Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                            curCursor = rock5Cursor;
                        }
                    }
                }
                else if(curBut == 'tree')
                {
                    if(curTree == 1)
                        curTree = 3;
                    else
                        curTree--;
                    if(curBut == 'tree')
                    {
                        if(curTree == 1){
                            tree1Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                            curCursor = tree1Cursor;
                        }
                        else if(curTree == 2){
                            tree2Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                            curCursor = tree2Cursor;
                        }
                        else if(curTree == 3){
                            tree3Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                            curCursor = tree3Cursor;
                        }
                    }
                }
            }
            if(e.keyCode == 69) // E key
            {
                groupRock.setVisible(false);
                groupTree.setVisible(false);

                if (curBut == 'rock')
                {
                    if (curRock == 5)
                        curRock = 1;
                    else
                        curRock++;
                    if(curRock == 1)
                    {
                        rock1Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock1Cursor;
                    }
                    else if(curRock == 2){
                        rock2Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock2Cursor;
                    }
                    else if(curRock == 3){
                        rock3Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock3Cursor;
                    }
                    else if(curRock == 4){
                        rock4Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock4Cursor;
                    }
                    else if(curRock == 5){
                        rock5Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock5Cursor;
                    }
                }
                else if (curBut == 'tree')
                {
                    if (curTree == 3)
                        curTree = 1;
                    else
                        curTree++;
                    if(curTree == 1)
                    {
                        tree1Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                        curCursor = tree1Cursor;
                    }
                    else if(curTree == 2){
                        tree2Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                        curCursor = tree2Cursor;
                    }
                    else if(curTree == 3){
                        tree3Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                        curCursor = tree3Cursor;
                    }
                }
            }
            if(e.keyCode == 65) // A key 
            {
                groupRock.setVisible(false);
                groupTree.setVisible(false);

                if(curBut == 'rock')
                {
                    if (rockSize == 0.5)
                    {
                        // do nothing or send a message to user.
                    }
                    else
                    {
                        rockSize = rockSize - 0.5;
                    }

                    if(curRock == 1)
                    {
                        rock1Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock1Cursor;
                    }
                    else if(curRock == 2){
                        rock2Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock2Cursor;
                    }
                    else if(curRock == 3){
                        rock3Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock3Cursor;
                    }
                    else if(curRock == 4){
                        rock4Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock4Cursor;
                    }
                    else if(curRock == 5){
                        rock5Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock5Cursor;
                    }
                }
                else if (curBut == 'tree')
                {
                    if (treeSize == 0.25)
                    {
                        // do nothing yet.
                    }
                    else
                    {
                        treeSize = treeSize - 0.25;
                    }

                    if(curTree == 1)
                    {
                        tree1Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                        curCursor = tree1Cursor;
                    }
                    else if(curTree == 2){
                        tree2Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                        curCursor = tree2Cursor;
                    }
                    else if(curTree == 3){
                        tree3Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                        curCursor = tree3Cursor;
                    }
                }
            }
            if(e.keyCode == 68) // D key
            {
                groupRock.setVisible(false);
                groupTree.setVisible(false);

                if(curBut == 'rock')
                {
                    if (rockSize == 3.5)
                    {
                        // do nothing or send a message to user.
                    }
                    else
                    {
                        rockSize = rockSize + 0.5;
                    }
                    
                    if(curRock == 1)
                    {
                        rock1Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock1Cursor;
                    }
                    else if(curRock == 2){
                        rock2Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock2Cursor;
                    }
                    else if(curRock == 3){
                        rock3Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock3Cursor;
                    }
                    else if(curRock == 4){
                        rock4Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock4Cursor;
                    }
                    else if(curRock == 5){
                        rock5Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(rockSize);
                        curCursor = rock5Cursor;
                    }
                }
                else if (curBut == 'tree')
                {
                    if (treeSize == 1)
                    {
                        // do nothing yet.
                    }
                    else
                    {
                        treeSize = treeSize + 0.25;
                    }

                    if(curTree == 1)
                    {
                        tree1Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                        curCursor = tree1Cursor;
                    }
                    else if(curTree == 2){
                        tree2Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                        curCursor = tree2Cursor;
                    }
                    else if(curTree == 3){
                        tree3Cursor.setVisible(true).setAlpha(0.5).setPosition(pointer.x, pointer.y).setScale(treeSize);
                        curCursor = tree3Cursor;
                    }
                }
            }
        };

        /*---------------------------------------------------------------------
        ** This handles the dragging mechanic. This allows the user to drag
        ** or move the path around.
        ---------------------------------------------------------------------*/
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) 
        {
            var left = 0 + dragX; 
            var right = width - dragX;
            var top = 0 + dragY;
            var bottom = height - dragY;

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

            if((gameObject.name == 'handleBob') || (gameObject.name == 'startingPoint'))
            {
                makePath(curve);
            }

            if(gameObject.data != null)
                gameObject.data.get('vector').set(gameObject.x, gameObject.y);
            
            
        });
    
        // this can be used if we want to add animation to the end of a dragging
        // movement.
        this.input.on('dragend', function (pointer, gameObject) 
        {

        });

        /*---------------------------------------------------------------------
        ** This little bit is for an animated circle the runs along the path
        ** that the user created. This gives the user an idea of which way the
        ** bad guys are going to go.
        ---------------------------------------------------------------------*/
        points = curve.getDistancePoints(100);
        graphics = this.add.graphics();

        var tween = this.tweens.add({
            targets: path,
            t: 1,
            ease: 'Linear',
            duration: 5000,
            yoyo: false,
            repeat: -1
        });

    },

    // Just an update function built into Phaser. This redraws graphics and
    // does the calculations every frame.
    update: function()
    {

        graphics.clear();

        //curve.draw(graphics, 100);
        curve.getPoint(path.t, path.vec);

        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(path.vec.x, path.vec.y, 10);
        graphics.fillStyle(0xbf47ff, 1);
    }
});