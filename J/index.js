// ホームページのJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // タイピング効果（ウェルカムメッセージ）
    const welcomeText = document.querySelector('.welcome-content h2');
    if (welcomeText) {
        const originalText = welcomeText.textContent;
        welcomeText.textContent = '';
        let index = 0;

        function typeWriter() {
            if (index < originalText.length) {
                welcomeText.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }

        // 少し遅れてタイピング開始
        setTimeout(typeWriter, 500);
    }

    // マップピンのインタラクティブ効果
    const mapPins = document.querySelectorAll('.map-pin');
    mapPins.forEach(pin => {
        pin.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.zIndex = '10';
            this.style.transition = 'transform 0.3s ease';
        });

        pin.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });

        // ピンをクリックするとツールチップを表示
        pin.addEventListener('click', function(e) {
            e.preventDefault();
            const tooltip = this.querySelector('.pin-tooltip');
            if (tooltip) {
                // 他のツールチップを隠す
                document.querySelectorAll('.pin-tooltip').forEach(t => {
                    if (t !== tooltip) {
                        t.style.opacity = '0';
                        t.style.visibility = 'hidden';
                    }
                });

                // クリックしたツールチップを表示
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
                tooltip.style.transform = 'translateX(-50%) translateY(-10px)';

                // 3秒後に自動で隠す
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.transform = 'translateX(-50%) translateY(0)';
                }, 3000);
            }
        });
    });

    // 統計情報のカウントアップアニメーション
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const targetValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = targetValue / 50; // 50フレームでカウントアップ

        function countUp() {
            currentValue += increment;
            if (currentValue < targetValue) {
                stat.textContent = Math.floor(currentValue);
                requestAnimationFrame(countUp);
            } else {
                stat.textContent = targetValue;
            }
        }

        // スクロール時にカウントアップ開始
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countUp();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(stat);
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
    const animatedElements = document.querySelectorAll('.animate-profile, .animate-about');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });

    // マップ背景のインタラクティブ効果
    const mapBackground = document.querySelector('.map-background');
    if (mapBackground) {
        mapBackground.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'transform 0.3s ease';
        });

        mapBackground.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // 旅行マップセクションのホバー効果
    const travelSection = document.querySelector('.travel-map-section');
    if (travelSection) {
        travelSection.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(255, 154, 158, 0.2)';
            this.style.transition = 'all 0.3s ease';
        });

        travelSection.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(255, 154, 158, 0.15)';
        });
    }

    // 統計アイテムのホバー効果
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ページロード時のウェルカムアニメーション
    const container = document.querySelector('.container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';

        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
            container.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }, 100);
    }

    // ナビゲーションのアクティブ状態管理
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // アクティブクラスをリセット
            navLinks.forEach(l => l.classList.remove('active'));
            // クリックしたリンクにアクティブクラスを追加
            this.classList.add('active');
        });
    });

    // キーボードナビゲーション（アクセシビリティ）
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.classList.contains('map-pin')) {
            e.target.click();
        }
    });
});
