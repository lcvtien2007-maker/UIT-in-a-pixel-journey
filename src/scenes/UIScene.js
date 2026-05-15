export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        const GAME_W = 960;
        const GAME_H = 540;

        // Các biến quản lý luồng hội thoại
        this.dialogueQueue = []; // Chứa danh sách các câu thoại
        this.isTyping = false;   // Kiểm tra xem chữ có đang chạy không
        this.fullText = "";      // Lưu câu thoại hoàn chỉnh

        this.dialogueContainer = this.add.container(0, 0);

        // a. Background hộp thoại
        const dialogBg = this.add.rectangle(GAME_W / 2, GAME_H - 75, GAME_W, 150, 0x000000, 0.8);
        
        // --- QUAN TRỌNG: LÀM CHO HỘP THOẠI BẤM VÀO ĐƯỢC ---
        dialogBg.setInteractive({ useHandCursor: true });
        dialogBg.on('pointerdown', this.advanceDialogue, this);

        const line = this.add.rectangle(GAME_W / 2 - 100, GAME_H - 110, 600, 2, 0xd0a352);
        this.nameText = this.add.text(50, GAME_H - 145, '', { fontSize: '26px', fill: '#d0a352', fontStyle: 'bold' });
        this.msgText = this.add.text(50, GAME_H - 90, '', { fontSize: '22px', fill: '#ffffff', wordWrap: { width: 650 } });
        this.avatar = this.add.image(850, GAME_H + 20, 'icon_character').setOrigin(0.5, 1);

        this.dialogueContainer.add([dialogBg, line, this.nameText, this.msgText, this.avatar]);
        this.dialogueContainer.setVisible(false);

        // Lắng nghe sự kiện truyền vào 1 MẢNG (Array) các câu thoại
        this.registry.events.on('SHOW_DIALOGUE_SERIES', this.startDialogueSeries, this);
    }

    startDialogueSeries(dialogueArray) {
        this.dialogueQueue = dialogueArray; // Nạp danh sách thoại
        this.dialogueContainer.setVisible(true);
        this.advanceDialogue(); // Chạy câu đầu tiên
    }

    advanceDialogue() {
        // 1. NẾU ĐANG GÕ CHỮ -> BẤM VÀO SẼ HIỆN HẾT CHỮ LUÔN
        if (this.isTyping) {
            this.time.removeAllEvents(); // Dừng bộ đếm thời gian gõ chữ
            this.msgText.setText(this.fullText); // Hiện toàn bộ câu
            this.isTyping = false;
            return; // Thoát hàm, chờ người chơi bấm lần nữa
        }

        // 2. NẾU ĐÃ HẾT THOẠI -> ĐÓNG HỘP THOẠI
        if (this.dialogueQueue.length === 0) {
            this.dialogueContainer.setVisible(false);
            return;
        }

        // 3. NẾU CÒN THOẠI -> CHUYỂN SANG CÂU TIẾP THEO
        const nextLine = this.dialogueQueue.shift(); // Lấy câu đầu tiên ra khỏi mảng
        
        this.nameText.setText(nextLine.name);
        if (nextLine.avatarKey) this.avatar.setTexture(nextLine.avatarKey);
        
        this.fullText = nextLine.text;
        this.msgText.setText('');
        this.isTyping = true;

        // Hiệu ứng gõ chữ
        let i = 0;
        this.time.addEvent({
            delay: 30, // Tốc độ gõ
            callback: () => {
                this.msgText.text += this.fullText[i];
                i++;
                if (i === this.fullText.length) {
                    this.isTyping = false; // Gõ xong thì tắt cờ typing
                }
            },
            repeat: this.fullText.length - 1
        });
    }
}