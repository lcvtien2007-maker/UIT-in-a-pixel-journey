import BootScene from './scenes/BootScene.js';
import Era1Scene from './scenes/Era1Scene.js';
import MenuScene from './scenes/MenuScene.js';

const config = {
  type: Phaser.AUTO,
  width: 320,
  height: 180,
  zoom: 3,              // scale lên x3 → hiển thị 960x540
  pixelArt: true,       // tắt anti-alias, pixel rõ nét
  physics: {
    default: 'arcade', 
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [BootScene, MenuScene, Era1Scene]
};

new Phaser.Game(config);