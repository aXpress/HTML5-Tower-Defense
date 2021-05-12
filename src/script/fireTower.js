var FireTower = new Phaser.Class ({
    Extends: Phaser.GameObjects.Image,

    initialize:

    function FireTower (scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('imgFireTower');
        this.setPosition(x, y);
    },

    place: function(i, j) {
        this.y = i * 64 + 64/2;
        this.x = k * 64 + 64/2;
    }

});

// class FireTower extends Phaser.GameObjects.Image {

//     FireTower (scene, x, y) {
//         Phaser.GameObjects.Image.call(this, scene);
//         this.setTexture('imgFireTower')
//         this.setPosition(x, y);
//     }

//     place (i, j) {
//         this.x = i*64 + 64/2;
//         this.x = j*64 + 64/2;
//     }
// }