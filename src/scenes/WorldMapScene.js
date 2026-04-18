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
        // Lưu ý: Tất cả các file này phải có kích thước bằng đúng 960x540 
        // với phần còn lại là trong suốt (transparent).
        for (let i = 1; i <= 5; i++) {
            this.load.image(`era${i}_light`, `assets/era${i}-light.png`);
            this.load.image(`era${i}_dark`, `assets/era${i}-dark.PNG`);
        }
    }

    create() {
        const centerX = 480; // 960 / 2
        const centerY = 270; // 540 / 2

        // Duyệt qua từng kỷ nguyên để vẽ
        for (let i = 1; i <= 5; i++) {
            const eraKey = `era${i}`;
            const isUnlocked = this.erasStatus[eraKey];
            
            // Chọn ảnh Sáng hoặc Tối dựa trên trạng thái
            const texture = isUnlocked ? `${eraKey}_light` : `${eraKey}_dark`;

            // VẼ VÙNG ĐẤT
            // Đặt tất cả vào chính giữa màn hình. 
            // Vì ảnh đã được cắt từ 1 ảnh chung, chúng sẽ tự khớp nhau 100%.
            const region = this.add.image(centerX, centerY, texture);

            if (isUnlocked) {
                // Thiết lập vùng nhận diện chuột chỉ nằm trong phần có màu (không tính phần trong suốt)
                region.setInteractive({ useHandCursor: true, pixelPerfect: true });

                // Hiệu ứng khi tương tác với các tòa nhà/vùng đất đã mở
                region.on('pointerover', () => region.setTint(0xffffff)); // Giữ nguyên màu
                region.on('pointerout', () => region.clearTint());
                
                region.on('pointerdown', () => {
                    console.log(`Tiến vào Kỷ nguyên ${i}`);
                    // this.scene.start(`Era${i}Scene`);
                });
            } else {
                // Vùng bị khóa: Có thể hiện thông báo khi bấm vào
                region.setInteractive({ pixelPerfect: true });
                region.on('pointerdown', () => {
                    this.cameras.main.shake(100, 0.005); // Rung màn hình nhẹ khi bấm vùng khóa
                    console.log(`Kỷ nguyên ${i} vẫn đang bị phong tỏa!`);
                });
            }
        }

        // Thêm các thành phần giao diện khác (nút quay lại, tên khu vực...)
        this.add.text(20, 20, "BẢN ĐỒ KỶ NGUYÊN UIT", {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        });
    }
}