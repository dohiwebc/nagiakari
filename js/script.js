/* ==========================================================================
   凪 燈 (NAGI AKARI) - Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. スクロール連動アニメーション (Intersection Observer) --- */
    const revealElements = document.querySelectorAll('.reveal, .section-title');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // 一度表示されたら監視を解除
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    /* --- 2. ハンバーガーメニューの開閉 --- */
    const menuTrigger = document.getElementById('menu-trigger');
    const navList = document.getElementById('nav-list');

    if (menuTrigger && navList) {
        menuTrigger.addEventListener('click', () => {
            menuTrigger.classList.toggle('is-active');
            navList.classList.toggle('is-active');
        });

        // メニュー内リンクをクリックしたら閉じる
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuTrigger.classList.remove('is-active');
                navList.classList.remove('is-active');
            });
        });
    }


    /* --- 3. スムーススクロール (ヘッダーの高さを考慮) --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === "#") return; // 単なる"#"の場合は無視

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* --- 4. ロゴクリック時の挙動 (トップページならスクロール / 他なら遷移) --- */
    const logoLink = document.querySelector('.logo');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            const isHomePage = window.location.pathname === '/' || 
                            window.location.pathname.endsWith('index.html') ||
                            window.location.pathname === '';
            
            // 現在地がトップページかつリンク先が index.html または # の場合
            if (isHomePage && (logoLink.getAttribute('href') === 'index.html' || logoLink.getAttribute('href') === '#')) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }


    /* --- 5. FAQ アコーディオン --- */
    const faqButtons = document.querySelectorAll('.faq-question');
    if (faqButtons.length > 0) {
        faqButtons.forEach(button => {
            button.addEventListener('click', () => {
                const item = button.parentElement;
                const answer = button.nextElementSibling;

                // アクティブ状態を切り替え
                item.classList.toggle('is-active');

                if (item.classList.contains('is-active')) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = 0;
                }
            });
        });
    }

});