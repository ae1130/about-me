// 犬紹介ページのJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 既存のアニメーション遅延
    const cards = document.querySelectorAll('.dog-card');
    cards.forEach((card, i) => {
        card.style.animationDelay = (i * 0.3) + 's';
    });

    // 犬カードのホバー効果強化
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(255, 154, 158, 0.3)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(255, 168, 204, 0.3)';
        });
    });

    // 犬画像のインタラクティブ効果
    const dogImages = document.querySelectorAll('.dog-img, .dog-placeholder');
    dogImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.transition = 'transform 0.3s ease';
        });

        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });

        // クリックで画像を拡大表示
        image.addEventListener('click', function() {
            showImageModal(this);
        });
    });

    // 画像モーダル表示関数
    function showImageModal(imageElement) {
        // モーダル要素を作成
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: pointer;
        `;

        // 拡大画像を作成
        const enlargedImage = document.createElement('img');
        if (imageElement.tagName === 'IMG') {
            enlargedImage.src = imageElement.src;
            enlargedImage.alt = imageElement.alt;
        } else {
            // プレースホルダーの場合は絵文字を表示
            const emoji = imageElement.querySelector('span');
            if (emoji) {
                modal.innerHTML = `<div style="font-size: 10rem; color: white;">${emoji.textContent}</div>`;
                document.body.appendChild(modal);

                modal.addEventListener('click', () => modal.remove());
                return;
            }
        }

        enlargedImage.style.cssText = `
            max-width: 80%;
            max-height: 80%;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;

        modal.appendChild(enlargedImage);
        document.body.appendChild(modal);

        // クリックでモーダルを閉じる
        modal.addEventListener('click', () => modal.remove());
    }

    // 犬情報の詳細表示トグル
    const dogInfos = document.querySelectorAll('.dog-info');
    dogInfos.forEach(info => {
        const details = info.querySelector('.dog-details');
        if (details) {
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = '詳細を見る';
            toggleBtn.className = 'dog-detail-toggle';
            toggleBtn.style.cssText = `
                background: linear-gradient(135deg, #ff9a9e, #ffa8cc);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 20px;
                cursor: pointer;
                margin-top: 15px;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(255, 154, 158, 0.3);
            `;

            toggleBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 20px rgba(255, 154, 158, 0.4)';
            });

            toggleBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(255, 154, 158, 0.3)';
            });

            let isExpanded = false;
            toggleBtn.addEventListener('click', function() {
                isExpanded = !isExpanded;
                details.style.display = isExpanded ? 'block' : 'none';
                details.style.animation = isExpanded ? 'fadeIn 0.3s ease' : 'none';
                this.textContent = isExpanded ? '詳細を隠す' : '詳細を見る';
            });

            // 初期状態で詳細を隠す
            details.style.display = 'none';
            info.appendChild(toggleBtn);
        }
    });

    // スクロール時のアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 監視対象の要素
    const animatedElements = document.querySelectorAll('.animate-dog-1, .animate-dog-2, .animate-dog-3, .animate-family');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // 家族セクションの特別効果
    const familySection = document.querySelector('.family-section');
    if (familySection) {
        familySection.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'transform 0.3s ease';
        });

        familySection.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // 犬の名前をクリックすると挨拶を表示
    const dogNames = document.querySelectorAll('.dog-info h2');
    dogNames.forEach(name => {
        name.addEventListener('click', function() {
            const dogName = this.textContent;
            showGreeting(dogName);
        });
    });

    function showGreeting(dogName) {
        const greetings = {
            'レオン': 'ワンワン！レオンです🐕',
            'ソフィア': 'ニャン！（ソフィアは犬ですが猫のような挨拶）😺',
            'シピ': 'ワンワン！シピです🐶'
        };

        const greeting = greetings[dogName] || `こんにちは、${dogName}です！`;
        alert(greeting);
    }
});
