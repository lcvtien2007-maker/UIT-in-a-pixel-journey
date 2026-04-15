import MenuScene from './scenes/MenuScene.js';
import WorldMapScene from './scenes/WorldMapScene.js';
import SettingsScene from './scenes/SettingsScene.js';

const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 180,
    pixelArt: true,

    // 1. CHỈ ĐỊNH RÕ NƠI CHỨA GAME TRONG HTML
    parent: 'game-container',

    // 2. BẬT HỆ THỐNG CO GIÃN TỰ ĐỘNG (THAY THẾ CHO ZOOM)
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 320,
        height: 180
    },

    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },

    scene: [MenuScene, WorldMapScene, SettingsScene]
};

new Phaser.Game(config);