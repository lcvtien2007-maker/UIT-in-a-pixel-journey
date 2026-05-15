export default class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
    }

    preload() {
        // Tải các ảnh cho giao diện Setting (960x540)
        this.load.image('settings_bg', 'assets/settings_bg.png');
        this.load.image('slider_track', 'assets/slider_track.png');
        this.load.image('slider_handle', 'assets/slider_handle.png');
        this.load.image('btn_mute_on', 'assets/btn_mute_on.png');
        this.load.image('btn_mute_off', 'assets/btn_mute_off.png');
        this.load.image('btn_back', 'assets/btn_back.png');
    }

    create() {
        const centerX = 480; // 960 / 2
        const centerY = 270; // 540 / 2

        // 1. Vẽ nền bảng cài đặt
        this.add.image(centerX, centerY, 'settings_bg');

        // 2. Logic Nút Mute (Bật/Tắt tiếng)
        const muteKey = this.sound.mute ? 'btn_mute_off' : 'btn_mute_on';
        const btnMute = this.add.image(centerX, 180, muteKey).setInteractive({ useHandCursor: true });

        btnMute.on('pointerdown', () => {
            this.sound.mute = !this.sound.mute; // Đảo trạng thái âm thanh toàn game
            btnMute.setTexture(this.sound.mute ? 'btn_mute_off' : 'btn_mute_on');
        });

        // 3. Logic Thanh trượt âm lượng (Slider)
        const track = this.add.image(centerX, 300, 'slider_track');
        
        // Xác định giới hạn kéo của nút trượt trên thanh
        const minX = centerX - track.displayWidth / 2;
        const maxX = centerX + track.displayWidth / 2;

        // Đặt nút trượt ở vị trí tương ứng với âm lượng hiện tại của game
        const startX = Phaser.Math.Linear(minX, maxX, this.sound.volume);
        const handle = this.add.image(startX, 300, 'slider_handle')
            .setInteractive({ draggable: true, useHandCursor: true });

        // Xử lý sự kiện kéo (Drag)
        this.input.setDraggable(handle);
        this.input.on('drag', (pointer, gameObject, dragX) => {
            // Chỉ cho phép kéo trong phạm vi thanh trượt
            gameObject.x = Phaser.Math.Clamp(dragX, minX, maxX);

            // Tính toán % âm lượng dựa trên vị trí nút trượt (0.0 đến 1.0)
            const newVolume = Phaser.Math.Percent(gameObject.x, minX, maxX);
            
            // CẬP NHẬT ÂM THANH TOÀN CỤC NGAY LẬP TỨC
            this.sound.setVolume(newVolume); 
        });

        // 4. Nút quay lại Menu
        const btnBack = this.add.image(centerX, 450, 'btn_back').setInteractive({ useHandCursor: true });
        btnBack.on('pointerdown', () => this.scene.start('MenuScene'));
    }
}