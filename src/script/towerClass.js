export class Tower extends Phaser.GameObjects.Container {
    constructor(x, y, scene, element) {
        super(scene);
        this.element = element;
        this.x = x;
        this.y = y;

        const tower = this.scene.add.rectangle(x, y, 20, 20, element);
        this.add(tower);

        this.scene.add.existing(this);
    }
}