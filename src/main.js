import MenuScene from './scenes/MenuScene.js';
import WorldMapScene from './scenes/WorldMapScene.js';
import SettingsScene from './scenes/SettingsScene.js';
import UIScene from './scenes/UIScene.js';

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
        width: 960,
        height: 540
    },

    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },

    scene: [
    //BootScene,
    //PreloadScene,
    MenuScene,
    SettingsScene,
    WorldMapScene,
    //Era1Scene, // (Các scene có sẵn của em)
    UIScene    // <--- THÊM DÒNG NÀY VÀO ĐÂY NHÉ!
]
};

new Phaser.Game(config);