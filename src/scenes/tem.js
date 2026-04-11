export default class Era1Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'Era1Scene' });
  }

  preload() {
    // Load asset — chạy 1 lần trước khi create
    this.load.tilemapTiledJSON('map1', 'assets/maps/era1.json');
    this.load.image('tiles1', 'assets/tilesets/tileset_era1.png');
    this.load.spritesheet('player', 'assets/sprites/player.png', {
      frameWidth: 32, frameHeight: 32
    });
    this.load.audio('bgm1', 'assets/audio/bgm_era1.mp3');
  }

  create() {
    // Tạo map từ Tiled
    const map = this.make.tilemap({ key: 'map1' });
    const tiles = map.addTilesetImage('tileset_era1', 'tiles1');
    const groundLayer = map.createLayer('Ground', tiles);
    const wallLayer  = map.createLayer('Walls', tiles);
    wallLayer.setCollisionByProperty({ collides: true });

    // Tạo nhân vật
    this.player = this.physics.add.sprite(80, 80, 'player');
    this.physics.add.collider(this.player, wallLayer);

    // Animation
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
      frameRate: 8, repeat: -1
    });

    // Camera follow
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Audio
    this.sound.play('bgm1', { loop: true, volume: 0.5 });
  }

  update() {
    const spd = 60;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-spd);
      this.player.anims.play('walk-left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(spd);
      this.player.anims.play('walk-right', true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-spd);
      this.player.anims.play('walk-up', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(spd);
      this.player.anims.play('walk-down', true);
    } else {
      this.player.anims.stop();
    }
  }
}