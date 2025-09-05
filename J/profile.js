// プロフィールページのJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // プロフィール情報のタイピング効果
    const profileInfo = document.querySelector('.profile-info');
    if (profileInfo) {
        const paragraphs = profileInfo.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
            p.style.opacity = '0';
            p.style.transform = 'translateX(-20px)';

            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateX(0)';
                p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }, index * 200);
        });
    }

    // プロフィール画像のホバー効果
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
        });

        profileImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        });

        // クリックで画像拡大
        profileImg.addEventListener('click', function() {
            showImageModal(this.src, this.alt);
        });
    }

    // 画像モーダル表示関数
    function showImageModal(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'profile-modal';
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

        const enlargedImage = document.createElement('img');
        enlargedImage.src = src;
        enlargedImage.alt = alt;
        enlargedImage.style.cssText = `
            max-width: 80%;
            max-height: 80%;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;

        modal.appendChild(enlargedImage);
        document.body.appendChild(modal);

        modal.addEventListener('click', () => modal.remove());
    }

    // スキルタグのアニメーションとインタラクティブ効果
    const skillTags = document.querySelectorAll('.skills-list li');
    skillTags.forEach((tag, index) => {
        // 初期状態
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px) scale(0.8)';

        // アニメーション遅延で表示
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0) scale(1)';
            tag.style.transition = 'all 0.5s ease';
        }, index * 150);

        // ホバー効果
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
            this.style.zIndex = '10';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            this.style.zIndex = '1';
        });

        // クリックでスキル説明を表示
        tag.addEventListener('click', function() {
            showSkillDescription(this.textContent);
        });
    });

    // スキル説明表示関数
    function showSkillDescription(skill) {
        const descriptions = {
            'AI900': 'Microsoft Azure AI Fundamentalsの認定資格を保有しています。AIの基礎概念とAzure AIサービスについて理解しています。',
            'HTML/CSS': 'Webサイトの構造とスタイリングを担当するフロントエンド技術を習得しています。',
            'サイバーセキュリティ': 'ホワイトハッカー専攻として、セキュリティの重要性を学び、脆弱性診断や対策について知識を深めています。',
            'JavaScript': 'インタラクティブなWebサイトを作成するためのプログラミング言語を学習中です。',
            'Python': 'データ分析や自動化スクリプト作成に使用する汎用プログラミング言語を習得しています。',
            'SQL': 'データベース操作のためのクエリ言語を理解しています。'
        };

        const description = descriptions[skill] || `${skill}についての詳細な知識を有しています。`;
        alert(`${skill}\n\n${description}`);
    }

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
    const animatedElements = document.querySelectorAll('.animate-profile, .animate-image, .animate-info, .animate-skills');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // プロフィールセクションのホバー効果
    const profileSection = document.querySelector('.profile-section');
    if (profileSection) {
        profileSection.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(255, 154, 158, 0.2)';
            this.style.transition = 'all 0.3s ease';
        });

        profileSection.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    }

    // スキルセクションのホバー効果
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillsSection.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'transform 0.3s ease';
        });

        skillsSection.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }

    // プロフィール情報のインタラクティブ効果
    const profileParagraphs = document.querySelectorAll('.profile-info p');
    profileParagraphs.forEach(p => {
        p.addEventListener('mouseenter', function() {
            this.style.color = '#ff9a9e';
            this.style.transition = 'color 0.3s ease';
        });

        p.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });

    // ページタイトルアニメーション
    const pageTitle = document.querySelector('h1');
    if (pageTitle) {
        pageTitle.style.opacity = '0';
        pageTitle.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            pageTitle.style.opacity = '1';
            pageTitle.style.transform = 'translateY(0)';
            pageTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }, 300);
    }
});
