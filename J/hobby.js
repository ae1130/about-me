// 趣味紹介ページのJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 趣味セクションのアニメーション遅延を設定
    const hobbySections = document.querySelectorAll('.hobby-section');
    hobbySections.forEach((section, index) => {
        section.style.animationDelay = (index * 0.2) + 's';
    });

    // 趣味画像のホバー効果を強化
    const hobbyImages = document.querySelectorAll('.hobby-placeholder');
    hobbyImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });

        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // スクロール時のフェードイン効果
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

    // 監視対象の要素を登録
    const animatedElements = document.querySelectorAll('.animate-intro, .animate-hobby-1, .animate-image, .animate-info');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // 趣味詳細のトグル機能
    const hobbyDetails = document.querySelectorAll('.hobby-details');
    hobbyDetails.forEach(detail => {
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = '詳細を表示';
        toggleBtn.className = 'detail-toggle-btn';
        toggleBtn.style.cssText = `
            background: #ff9a9e;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            margin-top: 10px;
            font-size: 0.9rem;
            transition: background 0.3s ease;
        `;

        toggleBtn.addEventListener('mouseenter', function() {
            this.style.background = '#ffa8cc';
        });

        toggleBtn.addEventListener('mouseleave', function() {
            this.style.background = '#ff9a9e';
        });

        let isExpanded = false;
        toggleBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            detail.style.display = isExpanded ? 'block' : 'none';
            this.textContent = isExpanded ? '詳細を隠す' : '詳細を表示';
        });

        // 初期状態で詳細を隠す
        detail.style.display = 'none';
        detail.parentNode.insertBefore(toggleBtn, detail.nextSibling);
    });
});
