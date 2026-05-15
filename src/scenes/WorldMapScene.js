export default class WorldMapScene extends Phaser.Scene {
    constructor() {
        super('WorldMapScene');
    }

    init() {
        // Trạng thái mở khóa của 5 Kỷ nguyên tại UIT
        this.erasStatus = {
            'era1': true,  // Era 1 (ví dụ: Tòa A) - Mặc định mở
            'era2': false, // Era 2 (ví dụ: Tòa B)
            'era3': false, 
            'era4': false,
            'era5': false
        };
    }

    preload() {
        // Tải 10 mảnh bản đồ (5 sáng, 5 tối)
        // Yêu cầu tên file chính xác như em đã cấu hình:
        for (let i = 1; i <= 5; i++) {
            this.load.image(`era${i}_light`, `assets/era${i}-light.png`);
            this.load.image(`era${i}_dark`, `assets/era${i}-dark.PNG`);
        }
    }

    create() {
        const centerX = 480; // 960 / 2
        const centerY = 270; // 540 / 2

        // CHÚ Ý CHỖ NÀY: Khởi chạy UIScene phải nằm TẠI ĐÂY
        this.scene.launch('UIScene');

        // Duyệt qua từng kỷ nguyên để vẽ
        for (let i = 1; i <= 5; i++) {
            const eraKey = `era${i}`;
            const isUnlocked = this.erasStatus[eraKey];
            
            // Chọn ảnh Sáng hoặc Tối dựa trên trạng thái
            const texture = isUnlocked ? `${eraKey}_light` : `${eraKey}_dark`;

            // VẼ VÙNG ĐẤT
            const region = this.add.image(centerX, centerY, texture);

            if (isUnlocked) {
                // Vùng đã mở
                region.setInteractive({ useHandCursor: true, pixelPerfect: true });

                region.on('pointerover', () => region.setTint(0xffffff));
                region.on('pointerout', () => region.clearTint());
                
                region.on('pointerdown', () => {
                    console.log(`Tiến vào Kỷ nguyên ${i}`);
                    // Sau này gỡ comment dòng dưới để vào màn chơi thật:
                    this.scene.start(`Era${i}Scene`);
                });
            } else {
                // VÙNG BỊ KHÓA: Gọi UI Hộp thoại Cốt truyện
                region.setInteractive({ pixelPerfect: true });
                
                region.on('pointerdown', () => { 
                    this.cameras.main.shake(100, 0.005); // Rung màn hình

                    // Thiết lập kịch bản cốt truyện tùy theo khu vực
                    let storyList = [];
                    
                    if (i === 2) {
                        storyList = [
                            { name: 'Hệ thống', text: 'Khu vực Tòa B hiện đang bị phong tỏa. Cần thẻ sinh viên để qua cổng!' },
                            { name: 'Nhân vật chính', text: 'Chết tiệt, thẻ của mình để quên ở Era 1 mất rồi...' },
                            { name: 'Đồng đội', text: 'Mau quay lại tìm thôi!' }
                        ];
                    } else if (i === 3) {
                        storyList = [
                            { name: 'Kẻ Gác Cổng', text: 'Ngươi chưa đủ cấp độ để tiến vào khu vực Đồ Sắt.' },
                            { name: 'Kẻ Gác Cổng', text: 'Hãy vượt qua thử thách của Thầy Duy và Thầy Kiên trước đã!' }
                        ];
                    } else {
                        // Kịch bản mặc định cho Era 4, 5
                        storyList = [
                            { name: 'Hệ thống', text: 'Kỷ nguyên này vẫn đang chìm trong sương mù lịch sử...' }
                        ];
                    }

                    // Phát tín hiệu đánh thức UIScene hiện hộp thoại
                    this.registry.events.emit('SHOW_DIALOGUE_SERIES', storyList);
                });
            }
        }

        // Thêm các thành phần giao diện khác
        this.add.text(20, 20, "BẢN ĐỒ KỶ NGUYÊN UIT", {
            fontSize: '20px', fill: '#ffffff', fontStyle: 'bold'
        });
    }
}