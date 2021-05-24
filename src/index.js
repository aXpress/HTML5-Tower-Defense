window.onload = function() {
    var config = {
        width: 1600,
        height: 900,
        // width: window.innerWidth,
        // height: window.innerHeight,
        physics: {
            default: 'arcade',
            arcade: { debug: true }
        },
        backgroundcolor: 0x000000,
        scene: [SplashScreen, MainMenu, LevelOne, LevelTwo, LevelThree, MapCreation],
    }

    // Disable right click
    document.addEventListener('contextmenu', event => event.preventDefault());

    var game = new Phaser.Game(config);
}