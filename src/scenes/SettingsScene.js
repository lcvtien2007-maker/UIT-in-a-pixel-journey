export default class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#111111');
        const width = this.scale.width;
        const height = this.scale.height;

        this.add.text(width / 2, 20, 'SETTINGS', { fontSize: '16px', fontStyle: 'bold' }).setOrigin(0.5);

        // --- 1. ÂM THANH (Dạng thanh trượt giả lập) ---
        this.add.text(40, 50, 'SOUND', { fontSize: '10px' });
        this.createSlider(width / 2 + 40, 55, 0.8); // Mặc định 80%

        // --- 2. NHẠC (Dạng thanh trượt giả lập) ---
        this.add.text(40, 80, 'MUSIC', { fontSize: '10px' });
        this.createSlider(width / 2 + 40, 85, 0.5); // Mặc định 50%

        // --- 3. VFX (Dạng Bật/Tắt) ---
        this.add.text(40, 110, 'VFX EFFECTS', { fontSize: '10px' });
        this.createToggle(width / 2 + 40, 110, true);

        // --- 4. KHUNG HÌNH (FPS Display) ---
        this.add.text(40, 140, 'SHOW FPS', { fontSize: '10px' });
        this.createToggle(width / 2 + 40, 140, false);

        // Nút Back về Menu
        const backBtn = this.add.text(width / 2, 170, 'SAVE & EXIT', { fontSize: '10px', fill: '#ffff00' })
            .setOrigin(0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerdown', () => this.scene.start('MenuScene'));
    }

    // Hàm tạo thanh trượt (Slider)
    createSlider(x, y, initialValue) {
        const sliderWidth = 100;
        // Thanh nền
        this.add.rectangle(x, y, sliderWidth, 4, 0x333333).setOrigin(0, 0.5);
        // Thanh giá trị
        const progress = this.add.rectangle(x, y, sliderWidth * initialValue, 4, 0x00ff00).setOrigin(0, 0.5);
        // Nút kéo
        const handle = this.add.circle(x + (sliderWidth * initialValue), y, 6, 0xffffff)
            .setInteractive({ draggable: true });

        handle.on('drag', (pointer, dragX) => {
            // Giới hạn nút kéo trong phạm vi thanh nền
            dragX = Phaser.Math.Clamp(dragX, x, x + sliderWidth);
            handle.x = dragX;
            progress.width = dragX - x;

            let volume = (dragX - x) / sliderWidth;
            console.log("Volume changed to: " + Math.round(volume * 100) + "%");
        });
    }

    // Hàm tạo nút Bật/Tắt (Toggle)
    createToggle(x, y, initialState) {
        let state = initialState;
        const toggleBtn = this.add.text(x, y, state ? '[ ON ]' : '[ OFF ]', {
            fontSize: '10px',
            fill: state ? '#00ff00' : '#ff0000'
        }).setInteractive({ useHandCursor: true });

        toggleBtn.on('pointerdown', () => {
            state = !state;
            toggleBtn.setText(state ? '[ ON ]' : '[ OFF ]');
            toggleBtn.setStyle({ fill: state ? '#00ff00' : '#ff0000' });
            console.log("Toggle changed to: " + state);
        });
    }
}