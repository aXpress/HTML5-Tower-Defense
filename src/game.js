window.onload = function() {
    var config = {
        width: 1600,
        height: 900,
        // width: window.innerWidth,
        // height: window.innerHeight,
        backgroundcolor: 0x000000,
        scene: [SplashScreen, MainMenu, LevelOne, LevelTwo, LevelThree, MapCreation],
    }

    var game = new Phaser.Game(config);
}