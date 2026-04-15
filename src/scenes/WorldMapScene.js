export default class WorldMapScene extends Phaser.Scene {
    constructor() {
        super('WorldMapScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#111111'); // Nền tối hơn một chút
        const width = this.scale.width;
        const height = this.scale.height;

        // --- 1. Tiêu đề và Nút Back ---
        this.add.text(width / 2, 20, 'SELECT ERA', {
            fontSize: '16px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const backBtn = this.add.text(20, 15, '< BACK', {
            fontSize: '10px',
            fill: '#aaaaaa'
        }).setInteractive({ useHandCursor: true });
        backBtn.on('pointerdown', () => this.scene.start('MenuScene'));

        // --- 2. Dữ liệu 5 Kỷ nguyên (Nâng cao) ---
        // Thêm thuộc tính coords để định vị chính xác trên "con đường"
        const erasData = [
            { id: 1, year: '2006', title: 'ERA 1', coords: { x: 60, y: 130 }, unlocked: true },
            { id: 2, year: '2011', title: 'ERA 2', coords: { x: 130, y: 100 }, unlocked: false },
            { id: 3, year: '2016', title: 'ERA 3', coords: { x: 200, y: 130 }, unlocked: false },
            { id: 4, year: '2021', title: 'ERA 4', coords: { x: 260, y: 80 }, unlocked: false },
            { id: 5, year: '2026', title: 'ERA 5', coords: { x: 300, y: 140 }, unlocked: false }
        ];

        // --- 3. Vẽ Con Đường (Dotted Path) ---
        this.drawPath(erasData);

        // --- 4. Vẽ các nút Era và Hiệu ứng Sương mù ---
        erasData.forEach((era) => {
            this.createEraNode(era);
        });
    }

    // Hàm vẽ đường nối zigzag
    drawPath(data) {
        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0xaaaaaa, 0.5); // Đường kẻ xám, hơi trong suốt

        // Bắt đầu vẽ từ Era 1
        graphics.beginPath();
        graphics.moveTo(data[0].coords.x, data[0].coords.y);

        // Vẽ đường nối tới các Era tiếp theo
        for (let i = 1; i < data.length; i++) {
            graphics.lineTo(data[i].coords.x, data[i].coords.y);
        }

        graphics.strokePath();
    }

    // Hàm tiện ích vẽ một nút Era (Node)
    createEraNode(era) {
        const { x, y } = era.coords;
        const isUnlocked = era.unlocked;

        // --- A. Phần hiển thị chính của Era (Hình khối placeholder) ---
        // Nếu unlocked thì màu xanh UIT, nếu locked thì màu xám tối
        const mainColor = isUnlocked ? 0x00ff00 : 0x444444;

        // Vẽ hình thoi/lá chắn đại diện (giống ảnh tham khảo)
        const node = this.add.polygon(x, y, [0, -15, 15, 0, 0, 15, -15, 0], mainColor)
            .setOrigin(0.5);

        // Chữ ghi năm (Year)
        const yearText = this.add.text(x, y, era.year, {
            fontSize: '10px',
            fill: isUnlocked ? '#000000' : '#888888',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Chữ ghi Era Title (Ví dụ: ERA 1)
        this.add.text(x, y + 22, era.title, {
            fontSize: '8px',
            fill: isUnlocked ? '#ffffff' : '#555555'
        }).setOrigin(0.5);

        // --- B. Xử lý Logic Tương tác ---
        if (isUnlocked) {
            node.setInteractive({ useHandCursor: true });

            // Hiệu ứng hover
            node.on('pointerover', () => {
                node.setFillStyle(0xffff00); // Sáng màu vàng
                yearText.setStyle({ fill: '#000000' });
            });
            node.on('pointerout', () => {
                node.setFillStyle(mainColor); // Về màu xanh
                yearText.setStyle({ fill: '#000000' });
            });

            // Click để vào game
            node.on('pointerdown', () => {
                console.log(`Đang vào ${era.title} (${era.year})...`);
                // this.scene.start('Era1Scene');
            });
        }
        // --- C. Hiệu ứng Sương mù (Placeholder) ---
        else {
            // Chúng ta dùng một hình tròn đen, bán trong suốt để "che" Era lại
            // Nó tạo cảm giác Era bị chìm vào bóng tối/sương mù
            this.add.circle(x, y, 25, 0x000000, 0.6)
                .setOrigin(0.5);

            // Thêm biểu tượng ổ khóa nhỏ
            this.add.text(x, y - 5, '🔒', { fontSize: '12px' }).setOrigin(0.5);
        }
    }
}