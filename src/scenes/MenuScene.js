export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        // --- TẢI TẤT CẢ HÌNH ẢNH ---
        this.load.image('background', 'assets/background2.png');
        this.load.image('btn_start', 'assets/btn_start.png');
        this.load.image('btn_settings', 'assets/btn_setting.png');
        this.load.image('btn_credits', 'assets/btn_credit.png');
        this.load.image('icon_achievement', 'assets/achievement.png');
        this.load.image('icon_character', 'assets/icon_character.png');
    }

    create() {
        // 1. KHAI BÁO THÔNG SỐ CƠ BẢN
        const GAME_W = 960;
        const GAME_H = 540;
        const rightColX = 760; // Trục dọc cho các nút bên phải

        // 2. ẢNH NỀN (Căn giữa 480, 270)
        const bg = this.add.image(GAME_W / 2, GAME_H / 2, 'background');
        bg.displayWidth = GAME_W;
        bg.displayHeight = GAME_H;

        // 3. TIÊU ĐỀ GAME (Nằm phía trên bên trái hoặc giữa tùy ý, ở đây thầy để lệch trái một chút)
        this.add.text(100, 50, 'UIT IN A PIXEL JOURNEY', {
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        });

        // 4. CẤU HÌNH CÁC NÚT BẤM (DỰA TRÊN BẢN VẼ NHÁP)

        // Nút START (To nhất - Tọa độ Y: 240)
        const playBtn = this.add.image(rightColX, 240, 'btn_start')
            .setInteractive({ useHandCursor: true });

        playBtn.on('pointerdown', () => {
            this.scene.start('WorldMapScene');
        });

        // Nút SETTINGS (Tọa độ Y: 330)
        const settingsBtn = this.add.image(rightColX, 330, 'btn_settings')
            .setInteractive({ useHandCursor: true });

        settingsBtn.on('pointerdown', () => {
            this.scene.start('SettingsScene');
        });

        // Nút ACHIEVEMENT (Tọa độ Y: 400)
        const achiBtn = this.add.image(rightColX, 400, 'icon_achievement')
            .setInteractive({ useHandCursor: true });

        achiBtn.on('pointerdown', () => {
            console.log("Mở màn hình Thành tựu");
        });

        // Nút CREDITS (Tọa độ Y: 470)
        const creditsBtn = this.add.image(rightColX, 470, 'btn_credits')
            .setInteractive({ useHandCursor: true });

        creditsBtn.on('pointerdown', () => {
            console.log("Mở màn hình Credits");
        });

        // 5. HIỆU ỨNG HOVER CHO TẤT CẢ CÁC NÚT
        const allButtons = [playBtn, settingsBtn, achiBtn, creditsBtn];

        allButtons.forEach(btn => {
            // Khi đưa chuột vào: Nút sáng lên và nhảy nhẹ lên trên
            btn.on('pointerover', () => {
                btn.setTint(0xdddddd); // Làm sáng nút
                btn.y -= 3;
            });

            // Khi đưa chuột ra: Trả về trạng thái cũ
            btn.on('pointerout', () => {
                btn.clearTint();
                btn.y += 3;
            });
        });

        // 6. CHỖ TRỐNG CHO NHÂN VẬT (Góc dưới bên trái theo bản vẽ)
        // Sau này em có thể thêm: this.add.sprite(250, 400, 'player_idle');
    }
}