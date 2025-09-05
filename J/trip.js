// 旅行紹介ページのJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 旅行セクションのアニメーション遅延
    const travelSections = document.querySelectorAll('.travel-section');
    travelSections.forEach((section, index) => {
        section.style.animationDelay = (index * 0.3) + 's';
    });

    // 旅行画像のインタラクティブ効果
    const travelImages = document.querySelectorAll('.travel-placeholder');
    travelImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.transition = 'transform 0.3s ease';
        });

        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });

        // クリックで旅行の詳細を表示
        image.addEventListener('click', function() {
            const section = this.closest('.travel-section');
            const travelName = section.querySelector('h2').textContent;
            showTravelStory(travelName);
        });
    });

    // 旅行ストーリー表示関数
    function showTravelStory(travelName) {
        const stories = {
            '北海道': '札幌雪祭りで巨大な雪像を見ることができ、雪の美しさに感動しました。オホーツク海で流氷を見たり、小樽の運河を散策したりと、北海道の自然を満喫しました！',
            '沖縄': '美しい海とリゾート気分を味わえる沖縄は最高でした。シュノーケリングで色鮮やかな魚を見たり、沖縄料理を堪能したりと、南国の魅力を存分に楽しめました。',
            '韓国': 'ソウルでK-POP文化を体験し、景福宮や北村韓屋村で歴史を感じました。食べ物も美味しくて、辛いキムチやビビンバが大好きになりました！',
            'タイ': 'バンコクの王宮や寺院を見て、アジアの異文化を感じました。トゥクトゥクに乗ったり、タイマッサージを受けたりと、タイの活気ある雰囲気が印象的でした。'
        };

        const story = stories[travelName] || `${travelName}での素敵な思い出がたくさんあります！`;
        alert(`${travelName}の思い出\n\n${story}`);
    }

    // 旅行詳細のトグル表示
    const travelInfos = document.querySelectorAll('.travel-info');
    travelInfos.forEach(info => {
        const details = info.querySelector('.travel-details');
        if (details) {
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = '詳細情報';
            toggleBtn.className = 'travel-detail-toggle';
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
                this.textContent = isExpanded ? '詳細を隠す' : '詳細情報';
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
    const animatedElements = document.querySelectorAll('.animate-intro, .animate-travel-1, .animate-travel-2, .animate-travel-3, .animate-travel-4, .animate-image, .animate-info');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // 旅行セクションのホバー効果
    travelSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
            this.style.boxShadow = '0 15px 35px rgba(255, 154, 158, 0.2)';
            this.style.transition = 'all 0.3s ease';
        });

        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(255, 168, 204, 0.3)';
        });
    });

    // 旅行タイトルのインタラクティブ効果
    const travelTitles = document.querySelectorAll('.travel-info h2');
    travelTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.color = '#ff9a9e';
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });

        title.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = 'scale(1)';
        });
    });

    // 旅行詳細情報のホバー効果
    const travelDetails = document.querySelectorAll('.travel-details p');
    travelDetails.forEach(detail => {
        detail.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 154, 158, 0.1)';
            this.style.padding = '5px 10px';
            this.style.borderRadius = '10px';
            this.style.transition = 'all 0.3s ease';
        });

        detail.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.padding = '';
        });
    });

    // ページロード時のイントロアニメーション
    const introSection = document.querySelector('.travel-intro');
    if (introSection) {
        introSection.style.opacity = '0';
        introSection.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            introSection.style.opacity = '1';
            introSection.style.transform = 'translateY(0)';
            introSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }, 200);
    }

    // 旅行場所のフィルター機能（将来的な拡張用）
    function createLocationFilter() {
        const locations = ['北海道', '沖縄', '韓国', 'タイ'];
        const filterContainer = document.createElement('div');
        filterContainer.className = 'location-filter';
        filterContainer.style.cssText = `
            text-align: center;
            margin: 20px 0;
            padding: 20px;
        `;

        const filterTitle = document.createElement('h3');
        filterTitle.textContent = '場所でフィルター';
        filterTitle.style.marginBottom = '15px';

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.flexWrap = 'wrap';

        locations.forEach(location => {
            const button = document.createElement('button');
            button.textContent = location;
            button.className = 'filter-btn';
            button.style.cssText = `
                background: #f8f9fa;
                border: 2px solid #ff9a9e;
                color: #ff9a9e;
                padding: 8px 16px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
            `;

            button.addEventListener('mouseenter', function() {
                this.style.background = '#ff9a9e';
                this.style.color = 'white';
            });

            button.addEventListener('mouseleave', function() {
                this.style.background = '#f8f9fa';
                this.style.color = '#ff9a9e';
            });

            button.addEventListener('click', function() {
                filterByLocation(location);
            });

            buttonContainer.appendChild(button);
        });

        filterContainer.appendChild(filterTitle);
        filterContainer.appendChild(buttonContainer);

        // 旅行セクションの前に挿入
        const firstTravelSection = document.querySelector('.travel-section');
        if (firstTravelSection) {
            firstTravelSection.parentNode.insertBefore(filterContainer, firstTravelSection);
        }
    }

    function filterByLocation(location) {
        travelSections.forEach(section => {
            const sectionTitle = section.querySelector('h2').textContent;
            if (sectionTitle === location) {
                section.style.display = 'block';
                section.style.animation = 'fadeIn 0.5s ease';
            } else {
                section.style.display = 'none';
            }
        });
    }

    // フィルター機能を有効にする（コメントアウトで無効化）
    // createLocationFilter();
});
