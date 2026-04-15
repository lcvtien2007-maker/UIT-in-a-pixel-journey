export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        // --- TẢI TẤT CẢ HÌNH ẢNH ---
        this.load.image('background', 'assets/background.png');
        this.load.image('btn_start', 'assets/btn_start.png');
        this.load.image('btn_settings', 'assets/btn_setting.png');
        this.load.image('btn_credits', 'assets/btn_credit.png');
        this.load.image('icon_achievement', 'assets/icon_achievement.png');
        this.load.image('icon_character', 'assets/icon_character.png');
    }

    create() {
        const GAME_W = 320;
        const GAME_H = 180;

        // 1. Ảnh nền (Căn giữa tuyệt đối)
        const bg = this.add.image(GAME_W / 2, GAME_H / 2, 'background');
        bg.displayWidth = GAME_W;
        bg.displayHeight = GAME_H;

        // 2. Tiêu đề (Vẫn giữ dạng Text hoặc thay bằng ảnh logo nếu có)
        this.add.text(GAME_W / 2, 35, 'UIT IN A PIXEL JOURNEY', {
            fontSize: '16px',
            fill: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // --- 3. CÁC NÚT BẤM CHÍNH (DẠNG ẢNH) ---

        // Nút START
        const playBtn = this.add.image(GAME_W / 2, 80, 'btn_start')
            .setInteractive({ useHandCursor: true })
            .setScale(0.15); // Chỉnh lại tỷ lệ này tùy theo kích thước ảnh thật của em

        playBtn.on('pointerdown', () => this.scene.start('WorldMapScene'));

        // Nút SETTINGS
        const settingsBtn = this.add.image(GAME_W / 2, 110, 'btn_settings')
            .setInteractive({ useHandCursor: true })
            .setScale(0.15);

        settingsBtn.on('pointerdown', () => this.scene.start('SettingsScene'));

        // Nút CREDITS
        const creditsBtn = this.add.image(GAME_W / 2, 135, 'btn_credits')
            .setInteractive({ useHandCursor: true })
            .setScale(0.15);

        creditsBtn.on('pointerdown', () => console.log("Mở màn hình Credits..."));

        // --- 4. CÁC ICON GÓC DƯỚI BÊN PHẢI (DẠNG ẢNH) ---
        const padding = 5;
        const iconScale = 0.1; // Các icon này thường nhỏ nên scale sẽ thấp hơn

        // Icon Thành tựu (Sát góc phải nhất)
        const achiIcon = this.add.image(GAME_W - padding, GAME_H - padding, 'icon_achievement')
            .setOrigin(1, 1) // Gắn neo vào góc dưới phải của ảnh
            .setInteractive({ useHandCursor: true })
            .setScale(iconScale);

        achiIcon.on('pointerdown', () => console.log("Mở Thành tựu..."));

        // Icon Nhân vật (Nằm bên trái Icon Thành tựu)
        const charIcon = this.add.image(achiIcon.x - (achiIcon.displayWidth + 5), GAME_H - padding, 'icon_character')
            .setOrigin(1, 1)
            .setInteractive({ useHandCursor: true })
            .setScale(iconScale);

        charIcon.on('pointerdown', () => console.log("Mở Chọn nhân vật..."));

        // --- 5. HIỆU ỨNG HOVER (Làm game sinh động hơn) ---
        const allButtons = [playBtn, settingsBtn, creditsBtn, achiIcon, charIcon];

        allButtons.forEach(btn => {
            btn.on('pointerover', () => {
                btn.setTint(0xcccccc); // Làm ảnh tối đi một chút khi đưa chuột vào
                btn.y -= 2; // Nhảy nhẹ lên trên
            });
            btn.on('pointerout', () => {
                btn.clearTint();
                btn.y += 2;
            });
        });
    }
}