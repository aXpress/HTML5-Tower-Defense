class Tower extends Phaser.GameObjects.Container {
    constructor(scene, x, y, element) {
        super(scene);
        this.element = element;
        this.x = x;
        this.y = y;

        scene.add.rectangle(x, y, 20, 20, element);

        scene.add.existing(this);
    }
    create() {
        console.log('tower class');
    }
}