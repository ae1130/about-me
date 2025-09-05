// お問い合わせページのJavaScript

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        // フォーム要素を取得
        const nameInput = document.getElementById('name');
        const subjectInput = document.getElementById('subject');
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // リアルタイムバリデーション
        function validateField(input, pattern = null) {
            const value = input.value.trim();
            let isValid = false;

            if (input.hasAttribute('required') && value === '') {
                showError(input, 'このフィールドは必須です');
                return false;
            }

            if (pattern && value !== '') {
                const regex = new RegExp(pattern);
                isValid = regex.test(value);
                if (!isValid) {
                    showError(input, '正しい形式で入力してください');
                    return false;
                }
            }

            hideError(input);
            return true;
        }

        function showError(input, message) {
            let errorElement = input.parentNode.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.cssText = `
                    color: #e74c3c;
                    font-size: 0.8rem;
                    margin-top: 5px;
                    font-weight: 500;
                `;
                input.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = message;
            input.style.borderColor = '#e74c3c';
        }

        function hideError(input) {
            const errorElement = input.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
            input.style.borderColor = '#ddd';
        }

        // 入力フィールドのイベントリスナー
        if (nameInput) {
            nameInput.addEventListener('blur', () => validateField(nameInput));
            nameInput.addEventListener('input', () => {
                if (nameInput.value.trim() !== '') hideError(nameInput);
            });
        }

        if (subjectInput) {
            subjectInput.addEventListener('blur', () => validateField(subjectInput));
            subjectInput.addEventListener('input', () => {
                if (subjectInput.value.trim() !== '') hideError(subjectInput);
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('blur', () => validateField(phoneInput, '^[0-9\\-]+$'));
            phoneInput.addEventListener('input', () => {
                if (phoneInput.value.trim() !== '') hideError(phoneInput);
            });
        }

        if (emailInput) {
            emailInput.addEventListener('blur', () => validateField(emailInput, '^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$'));
            emailInput.addEventListener('input', () => {
                if (emailInput.value.trim() !== '') hideError(emailInput);
            });
        }

        // フォーム送信時の処理
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // すべてのフィールドをチェック
            let isFormValid = true;

            if (nameInput) isFormValid &= validateField(nameInput);
            if (subjectInput) isFormValid &= validateField(subjectInput);
            if (phoneInput) isFormValid &= validateField(phoneInput, '^[0-9\\-]+$');
            if (emailInput) isFormValid &= validateField(emailInput, '^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$');
            if (messageInput && messageInput.hasAttribute('required')) {
                isFormValid &= validateField(messageInput);
            }

            if (isFormValid) {
                // 送信確認ダイアログ
                const confirmSend = confirm('お問い合わせを送信しますか？');
                if (confirmSend) {
                    // 送信成功メッセージ
                    showSuccessMessage();
                    contactForm.reset();
                }
            } else {
                // エラーメッセージ
                alert('入力内容に誤りがあります。赤いメッセージを確認してください。');
            }
        });

        function showSuccessMessage() {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.style.cssText = `
                background: #d4edda;
                color: #155724;
                padding: 15px;
                border-radius: 10px;
                margin-top: 20px;
                border: 1px solid #c3e6cb;
                text-align: center;
                font-weight: 500;
            `;
            successDiv.textContent = 'お問い合わせを送信しました！ありがとうございます。';

            contactForm.appendChild(successDiv);

            // 3秒後にメッセージを消す
            setTimeout(() => {
                successDiv.remove();
            }, 3000);
        }
    }

    // フォームアニメーション
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // 入力フィールドのフォーカス効果
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#ff9a9e';
            this.style.boxShadow = '0 0 0 2px rgba(255, 154, 158, 0.2)';
        });

        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    });

    // 文字数カウンター（メッセージ欄がある場合）
    if (messageInput) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            font-size: 0.8rem;
            color: #666;
            text-align: right;
            margin-top: 5px;
        `;
        messageInput.parentNode.appendChild(counter);

        function updateCounter() {
            const remaining = 500 - messageInput.value.length;
            counter.textContent = `残り ${remaining} 文字`;
            counter.style.color = remaining < 50 ? '#e74c3c' : '#666';
        }

        messageInput.addEventListener('input', updateCounter);
        updateCounter(); // 初期表示
    }
});
