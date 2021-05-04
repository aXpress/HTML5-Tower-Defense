# HTML5-Tower-Defense
Made with Phaser, html, css, and javascript.

## Authors
  - Troy Holt
  - Abraham Cheng
  - Eric Johnson
  
## Game Details
The state of the game right now is not exactly 'playable'. You can see the foundation of the game and its mechanics though. You can interact with it and check out some of the current mechanics by clicking on this link. 

### Map creation
We have a map creation scene which will allow users to create their own maps and share them. It is also how we will be creating our levels. When you arrive in the map creation scene, you are greeted with text (still changing and evolving) that explains how to use the map creation system. The user creates organic paths by placing down nodes that use a spline algorithm that is built into phaser. They can delete nodes and place new ones as they see fit. They can place obstacles or 'null' areas that the player cant build. This creates an environment where the user has to make strategic decisions on what towers they should build and where. Some obstacles include rocks, tree's and water.

#### - Path
The path is the main element of the game. It is the route that the enemies walk along. The path will not allow users to build on it. It is an organic shape that is created by placing nodes. Nodes can be deleted by holding 'X' on the keyboard while clicking on a node. The first path node will always be connected to an edge of the map. Any node following the starting node will only snap to the edge of the map if it is within 60px of the edge. The allows the user to create an entrance and a exit for the path. The Bad guys need a way to enter the map and exit the map, having the path lock to the edge will help create that. 
- Future Changes
  - The starting and ending nodes should have some sort of art to show clearly that those nodes are the entrance and exit. 

#### - Rocks
In the map creation scene, the user needs to click on the button named 'Rock', and they will be able to place rocks. Right now the rocks are procedurally generated. Every rock placed will be a different shape than the all the other rocks.
- Future Changes
  - The rock texture does not represent a finished product. It will be altered at some point.
  - The ability for the user to change the size of the rocks.
  - A preview of the current rock about to be placed. This will allow the user to see the shape and size of rock before the place it down.
  - The ability to delete a placed rock.

#### - Trees
In the map creation scene, the user needs to click on the button named 'Tree', and they will be able to place trees. Right now the tree is just placeholder art. It essentially just places a green circle with a stroke line. 
- Future Changes
  - The tree shape will be more treelike.. It would be nice to have some sort of animation that shows a slight swaying with the wind. <- would be super cool to see some sort of reaction to blasts from the towers.
  - The ability for the user to change the size of the rocks.
  - A preview of the current tree about to be placed. This gives the user the ability to see the size and shape of the tree being placed. 
  - The ability to delete a placed tree.

#### - Water
As of right now water has not been implemented. 
- Future Changes
  - I think I will use something close to the path system. The user will probably place down nodes to lay water. I want to implement a size change mechanic to the nodes to make parts of a river wider or thinner based on what the user chooses. It would be nice to see some sort of interaction of the water with the surrounding elements. Maybe rocks can create a splash effect or something else along that vein.
  - The ability to delete water.

### Towers


### Enemies
Right now we have three enemies implemented. 
- Future Changes
  - Implement enemy attack and health stats. The enemies will have the same properties as towers. Weaknesses and strengths will be based on their respective elements.
  - Will implement enemy animations such as walk and attacking
  - Will also implement basic enemy AI


### Levels
